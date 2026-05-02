import { Header } from "@/components/Header";
import { FeedbackForm } from "@/components/FeedbackForm";
import { RequestForm } from "@/components/RequestForm";
import { StatusBadge } from "@/components/StatusBadge";
import { deliveryTimeline } from "@/data/siteContent";
import { useToast } from "@/hooks/use-toast";
import { feedbackApi, requestsApi, drivesApi, apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { Drive, RequestItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock, MapPin, Package, Plus, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const normalizeRequestStatus = (status?: string) => {
  const normalized = (status || "PENDING").toLowerCase().replace("_", "-");
  if (normalized === "fulfilled") return "fulfilled";
  if (normalized === "completed") return "completed";
  if (normalized === "approved") return "approved";
  if (normalized === "rejected") return "rejected";
  if (normalized === "delivered") return "delivered";
  if (normalized === "in-progress") return "in-progress";
  return "pending";
};

const RecipientDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const { data: drives } = useQuery({
    queryKey: ["drives"],
    queryFn: drivesApi.getAll,
  });

  const { data: requests } = useQuery({
    queryKey: ["requests", user?.id],
    queryFn: () =>
      user ? apiFetch<RequestItem[]>(`/requests/recipient/${user.id}`) : [],
  });

  const createRequest = useMutation({
    mutationFn: requestsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      setIsRequestModalOpen(false);
      toast({
        title: "Request submitted",
        description: "Your assistance request has been submitted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const createFeedback = useMutation({
    mutationFn: feedbackApi.create,
    onSuccess: () => {
      setIsFeedbackModalOpen(false);
      toast({
        title: "Feedback submitted",
        description: "Thank you for sharing your feedback!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit feedback.",
        variant: "destructive",
      });
    },
  });

  const displayDrives = (drives || []).slice(0, 2);
  const displayRequests = requests || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container space-y-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-foreground">
              My Requests
            </h1>
            <p className="text-muted-foreground">
              Manage your assistance requests
            </p>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => setIsRequestModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Request Items
          </Button>
        </div>

        <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Assistance Request</DialogTitle>
            </DialogHeader>
            <RequestForm
              onSubmit={(data) =>
                createRequest.mutate({
                  ...data,
                  status: "PENDING",
                  recipient: user ? { id: user.id } : undefined,
                })
              }
              isLoading={createRequest.isPending}
              isRecipient={true}
            />
          </DialogContent>
        </Dialog>

        <Card className="border-border border-secondary/20 bg-gradient-to-r from-secondary/10 to-accent/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Active Emergency Drives
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/drives" className="text-secondary hover:text-secondary/80">
                View All
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayDrives.length > 0 ? (
                displayDrives.map((drive: Drive) => (
                  <div
                    key={drive.id}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-secondary/10 p-2">
                        <Package className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {drive.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {drive.location} | {drive.status.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-secondary text-secondary hover:bg-secondary/5"
                      asChild
                    >
                      <Link to="/drives">Join</Link>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-sm text-muted-foreground">
                  No active drives found.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>My Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {displayRequests.length > 0 ? (
                    displayRequests.map((request: RequestItem, index: number) => (
                      <div
                        key={request.id || index}
                        className="border-b border-border py-4 last:border-0"
                      >
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {request.item}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {request.quantityDescription}
                            </p>
                          </div>
                          <StatusBadge
                            status={normalizeRequestStatus(request.status)}
                          />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {request.eta || "Pending ETA"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-4 text-center text-sm text-muted-foreground">
                      No requests found. Click 'Request Items' to start.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Delivery Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deliveryTimeline.map((step, index) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`mb-2 h-3 w-3 rounded-full ${
                            step.isComplete ? "bg-primary" : "bg-muted"
                          }`}
                        />
                        {index < deliveryTimeline.length - 1 && (
                          <div className="h-8 w-0.5 bg-border" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{step.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {step.dateLabel}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/5"
                  onClick={() => setIsFeedbackModalOpen(true)}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Rate Delivery
                </Button>
              </CardContent>
            </Card>

            <Dialog open={isFeedbackModalOpen} onOpenChange={setIsFeedbackModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rate Delivery</DialogTitle>
                </DialogHeader>
                <FeedbackForm
                  onSubmit={(data) =>
                    createFeedback.mutate({ ...data, userId: user?.id })
                  }
                  isLoading={createFeedback.isPending}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientDashboard;
