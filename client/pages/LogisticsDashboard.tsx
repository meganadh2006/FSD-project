import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Truck, Package, MapPin, MoreVertical } from "lucide-react";

const LogisticsDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Logistics Management
          </h1>
          <p className="text-muted-foreground">
            Manage deliveries and optimize routes
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Assigned Pickups
                  </p>
                  <p className="text-3xl font-bold text-primary">23</p>
                </div>
                <Truck className="w-12 h-12 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Transit</p>
                  <p className="text-3xl font-bold text-secondary">8</p>
                </div>
                <Package className="w-12 h-12 text-secondary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Delivered Today</p>
                  <p className="text-3xl font-bold text-accent">12</p>
                </div>
                <MapPin className="w-12 h-12 text-accent/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { status: "Pending", color: "border-yellow-200" },
            { status: "In Transit", color: "border-blue-200" },
            { status: "Delivered", color: "border-green-200" },
          ].map((column) => (
            <Card key={column.status} className={`border-t-4 ${column.color} border-l border-r border-b border-border`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {column.status}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    (8)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="p-3 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">
                          Delivery #{item}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          3 items • Priority
                        </p>
                      </div>
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Inventory & Route */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Current Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { item: "Food Packages", qty: 245, capacity: 500 },
                  { item: "Blankets", qty: 89, capacity: 200 },
                  { item: "Medicine Kits", qty: 34, capacity: 100 },
                ].map((inv, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-medium text-foreground">
                        {inv.item}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {inv.qty}/{inv.capacity}
                      </p>
                    </div>
                    <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(inv.qty / inv.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Route Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                  <p className="font-medium text-foreground mb-2">Route A</p>
                  <p className="text-sm text-muted-foreground">
                    5 stops • Est. 2.5 hours • 45 km
                  </p>
                  <Button size="sm" className="mt-3 w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Route
                  </Button>
                </div>

                <div className="p-4 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg border border-secondary/20">
                  <p className="font-medium text-foreground mb-2">Route B</p>
                  <p className="text-sm text-muted-foreground">
                    3 stops • Est. 1.5 hours • 28 km
                  </p>
                  <Button size="sm" className="mt-3 w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Start Route
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;
