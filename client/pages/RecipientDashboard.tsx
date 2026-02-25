import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { MapPin, Clock, Star } from "lucide-react";

const RecipientDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              My Requests
            </h1>
            <p className="text-muted-foreground">
              Manage your assistance requests
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Request Items
          </Button>
        </div>

        {/* Available Drives */}
        <Card className="border-border bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Nearby Active Drives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    Flood Relief - City West
                  </p>
                  <p className="text-sm text-muted-foreground">
                    2.5 km away • Food & Water
                  </p>
                </div>
                <Button size="sm" variant="outline" className="border-secondary text-secondary hover:bg-secondary/5">
                  Join
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    Winter Emergency Fund
                  </p>
                  <p className="text-sm text-muted-foreground">
                    1.8 km away • Clothing & Blankets
                  </p>
                </div>
                <Button size="sm" variant="outline" className="border-secondary text-secondary hover:bg-secondary/5">
                  Join
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>My Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      item: "Food & Water",
                      qty: "For 4 people",
                      status: "delivered",
                      eta: "Delivered on Jan 20",
                    },
                    {
                      item: "Blankets",
                      qty: "5 units",
                      status: "in-progress",
                      eta: "Expected by Jan 25",
                    },
                    {
                      item: "Medicine",
                      qty: "First aid kit",
                      status: "approved",
                      eta: "Pickup scheduled",
                    },
                  ].map((request, index) => (
                    <div
                      key={index}
                      className="py-4 border-b border-border last:border-0"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-foreground">
                            {request.item}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {request.qty}
                          </p>
                        </div>
                        <StatusBadge status={request.status as any} />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {request.eta}
                      </div>
                    </div>
                  ))}
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
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mb-2" />
                      <div className="w-0.5 h-8 bg-border" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Requested</p>
                      <p className="text-xs text-muted-foreground">Jan 20</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mb-2" />
                      <div className="w-0.5 h-8 bg-border" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">In Transit</p>
                      <p className="text-xs text-muted-foreground">Jan 22</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-muted" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Delivered</p>
                      <p className="text-xs text-muted-foreground">Expected soon</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                  <Star className="mr-2 w-4 h-4" />
                  Rate Delivery
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientDashboard;
