import { FormEvent, useEffect, useState } from "react";
import { Gift, Heart, Loader2, PackagePlus, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { drivesApi } from "@/lib/api";

import { Header } from "@/components/Header";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth";

type DonationStatus = "pending" | "approved" | "in-progress" | "delivered";

type Donation = {
  id: number;
  item: string;
  quantity: number;
  status: DonationStatus | string;
  date: string;
};

type DonationFormState = {
  item: string;
  quantity: string;
  date: string;
  notes: string;
};

const initialFormState: DonationFormState = {
  item: "",
  quantity: "",
  date: new Date().toISOString().split("T")[0],
  notes: "",
};

const normalizeStatus = (status: string): DonationStatus => {
  switch (status.toUpperCase()) {
    case "APPROVED":
      return "approved";
    case "DELIVERED":
      return "delivered";
    case "IN_PROGRESS":
      return "in-progress";
    default:
      return "pending";
  }
};

const DonorDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<DonationFormState>(initialFormState);

  const fetchDonations = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiFetch(`/donations/donor/${user.id}`);
      const normalized = Array.isArray(data)
        ? data.map((donation) => ({
            id: donation.id,
            item: donation.item,
            quantity: donation.quantity,
            date: donation.date,
            status: normalizeStatus(donation.status ?? "PENDING"),
          }))
        : [];

      setDonations(normalized);
    } catch (error) {
      toast({
        title: "Unable to load donations",
        description:
          error instanceof Error
            ? error.message
            : "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [user]);

  const deliveredCount = donations.filter(
    (donation) => donation.status === "delivered",
  ).length;
  const totalQuantity = donations.reduce(
    (sum, donation) => sum + donation.quantity,
    0,
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in as a donor to create a donation.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await apiFetch("/donations", {
        method: "POST",
        body: JSON.stringify({
          item: formState.notes
            ? `${formState.item} - ${formState.notes}`
            : formState.item,
          quantity: Number(formState.quantity),
          date: formState.date,
          donor: { id: user.id },
        }),
      });

      toast({
        title: "Donation created",
        description: "Your donation has been submitted successfully.",
      });

      setFormState(initialFormState);
      setIsDialogOpen(false);
      await fetchDonations();
    } catch (error) {
      toast({
        title: "Could not create donation",
        description:
          error instanceof Error
            ? error.message
            : "Please check your details and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container space-y-8 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-foreground">
              My Donations
            </h1>
            <p className="text-muted-foreground">
              Track your support and create new donations in seconds.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Gift className="mr-2 h-4 w-4" />
                Create Donation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Donation</DialogTitle>
                <DialogDescription>
                  Add the item, quantity, and date so the team can process your donation.
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="item">Donation Item</Label>
                  <Input
                    id="item"
                    placeholder="Food packages, blankets, water bottles..."
                    required
                    value={formState.item}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        item: event.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      min="1"
                      required
                      type="number"
                      value={formState.quantity}
                      onChange={(event) =>
                        setFormState((current) => ({
                          ...current,
                          quantity: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Donation Date</Label>
                    <Input
                      id="date"
                      required
                      type="date"
                      value={formState.date}
                      onChange={(event) =>
                        setFormState((current) => ({
                          ...current,
                          date: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Optional details like packaging, size, or condition."
                    value={formState.notes}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        notes: event.target.value,
                      }))
                    }
                  />
                </div>

                <DialogFooter>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <PackagePlus className="mr-2 h-4 w-4" />
                        Submit Donation
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Donations</p>
                  <p className="text-3xl font-bold text-primary">
                    {donations.length}
                  </p>
                </div>
                <Gift className="h-12 w-12 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Items Delivered</p>
                  <p className="text-3xl font-bold text-secondary">
                    {deliveredCount}
                  </p>
                </div>
                <Truck className="h-12 w-12 text-secondary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Units Shared</p>
                  <p className="text-3xl font-bold text-accent">
                    {totalQuantity}
                  </p>
                </div>
                <Heart className="h-12 w-12 text-accent/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Donation History */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>
              Your latest donation updates appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <div className="py-8 text-center text-muted-foreground">
                  Loading latest donations...
                </div>
              ) : donations.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  You haven't made any donations yet.
                </div>
              ) : (
                donations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-center justify-between py-4 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {donation.item}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {donation.quantity} | {donation.date}
                      </p>
                    </div>
                    <StatusBadge status={donation.status as any} />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Drives */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Join Active Emergency Drives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Check available emergency drives to contribute
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5" asChild>
                <Link to="/drives">View All Drives</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonorDashboard;
