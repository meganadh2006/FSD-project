import React from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, MapPin, ArrowRight } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { drivesApi, donationsApi } from "@/lib/api";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DonationForm } from "@/components/DonationForm";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";

const EmergencyDrives = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState<any>(null);

  const { data: drives, isLoading, error } = useQuery({
    queryKey: ['drives'],
    queryFn: drivesApi.getAll,
  });

  const createDonation = useMutation({
    mutationFn: donationsApi.create,
    onSuccess: () => {
      setIsModalOpen(false);
      toast({
        title: "Contribution Successful",
        description: "Thank you for your generous contribution!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to process contribution. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Active Emergency Drives
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These are the current emergency relief efforts. Your contribution can help save lives and support communities in crisis.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-24 bg-muted" />
                <CardContent className="space-y-4 pt-6">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-10 bg-muted rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive font-semibold">Error loading drives. Please try again later.</p>
          </div>
        ) : drives && drives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drives.map((drive: any) => (
              <Card key={drive.id} className="overflow-hidden border-border hover:shadow-lg transition-all transform hover:-translate-y-1">
                <CardHeader className="bg-primary/5 pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-bold text-foreground">
                      {drive.title}
                    </CardTitle>
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 text-secondary" />
                    {drive.location}
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-semibold text-foreground">Items Needed:</p>
                    <p className="text-sm text-muted-foreground">
                      {drive.itemsNeeded}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      drive.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {drive.status.toUpperCase()}
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => {
                        if (!user) {
                          toast({
                            title: "Please log in",
                            description: "Sign in before contributing to a drive.",
                            variant: "destructive",
                          });
                          return;
                        }
                        setSelectedDrive(drive);
                        setIsModalOpen(true);
                      }}
                    >
                      Contribute <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No active drives found</h3>
            <p className="text-muted-foreground">Check back later for new emergency relief efforts.</p>
          </div>
        )}
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contribute to {selectedDrive?.title}</DialogTitle>
          </DialogHeader>
          <DonationForm
            isDonor={true}
            initialValues={{ item: selectedDrive?.itemsNeeded }}
            onSubmit={(data) => createDonation.mutate(data)}
            isLoading={createDonation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmergencyDrives;
