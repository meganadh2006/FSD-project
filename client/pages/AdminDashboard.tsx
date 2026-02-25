import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/KPICard";
import { BarChart3, TrendingUp, Users, Package } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage platform analytics, donation drives, and user accounts
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Donations"
            value="2,543"
            icon={Package}
            trend={{ value: 12, isPositive: true }}
            iconClassName="bg-primary/10"
          />
          <KPICard
            title="Active Drives"
            value="12"
            icon={BarChart3}
            trend={{ value: 5, isPositive: true }}
            iconClassName="bg-secondary/10"
          />
          <KPICard
            title="Total Users"
            value="1,284"
            icon={Users}
            trend={{ value: 8, isPositive: true }}
            iconClassName="bg-accent/10"
          />
          <KPICard
            title="Deliveries Pending"
            value="143"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: false }}
            iconClassName="bg-destructive/10"
          />
        </div>

        {/* Placeholder Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-border">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">
                      New donation drive created
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Winter Relief Initiative
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">
                      User registration spike
                    </p>
                    <p className="text-xs text-muted-foreground">
                      +45 new donors
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">4h ago</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-foreground">
                      Delivery completed
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Flood Relief - City West
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">6h ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Create New Drive
              </Button>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                Manage Users
              </Button>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                View Reports
              </Button>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No pending approvals at the moment
              </p>
              <p className="text-sm text-muted-foreground">
                Donation listings and user registrations will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
