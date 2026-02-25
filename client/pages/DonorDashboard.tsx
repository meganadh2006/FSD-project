import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Gift, Heart, Truck } from "lucide-react";

const DonorDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              My Donations
            </h1>
            <p className="text-muted-foreground">
              Track and manage your donations
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Gift className="mr-2 w-4 h-4" />
            Create Donation
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Donations
                  </p>
                  <p className="text-3xl font-bold text-primary">24</p>
                </div>
                <Gift className="w-12 h-12 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Items Delivered
                  </p>
                  <p className="text-3xl font-bold text-secondary">18</p>
                </div>
                <Truck className="w-12 h-12 text-secondary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Lives Impacted</p>
                  <p className="text-3xl font-bold text-accent">156</p>
                </div>
                <Heart className="w-12 h-12 text-accent/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Donation History */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  item: "Food Packages",
                  quantity: 50,
                  status: "delivered",
                  date: "2024-01-15",
                },
                {
                  item: "Blankets",
                  quantity: 30,
                  status: "in-progress",
                  date: "2024-01-18",
                },
                {
                  item: "Medical Supplies",
                  quantity: 20,
                  status: "approved",
                  date: "2024-01-20",
                },
                {
                  item: "Clothing",
                  quantity: 100,
                  status: "pending",
                  date: "2024-01-22",
                },
              ].map((donation, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {donation.item}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {donation.quantity} • {donation.date}
                    </p>
                  </div>
                  <StatusBadge status={donation.status as any} />
                </div>
              ))}
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
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                View All Drives
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonorDashboard;
