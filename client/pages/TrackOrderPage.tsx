import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { useAuth } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Heart,
  Package, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ChevronLeft,
  User,
  Phone,
  ShieldCheck,
  Star
} from "lucide-react";

const TrackOrder = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Set status to delivered for the demo/feedback capability
  const isDelivered = true; 

  const steps = [
    { title: "Order Picked Up", time: "09:30 AM", status: "completed", description: "Your order has been picked up from the donor." },
    { title: "In Transit", time: "11:45 AM", status: "completed", description: "The delivery is on its way to the distribution hub." },
    { title: "Arrived at Hub", time: "02:15 PM", status: "current", description: "Processing at our North Regional Center." },
    { title: "Out for Delivery", time: "Pending", status: "upcoming", description: "A driver will be assigned shortly." },
    { title: "Delivered", time: "Pending", status: "upcoming", description: "Arrival at your designated location." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8 max-w-5xl space-y-8">
        {/* Navigation & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Button variant="ghost" size="sm" asChild className="mb-2 -ml-2">
              <Link to="/logistics">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Logistics
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">Track Order #{id}</h1>
              <StatusBadge status={isDelivered ? "delivered" : "in-progress"} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Download Receipt</Button>
            <Button size="sm">Support</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Map & Timeline */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mock Map */}
            <Card className="overflow-hidden border-border bg-muted/30">
              <div className="aspect-video relative overflow-hidden flex items-center justify-center">
                 {/* Visual Mock Map Pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" 
                     style={{ 
                       backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', 
                       backgroundSize: '20px 20px' 
                     }}></div>
                
                {/* Simulated Route Line */}
                <svg className="absolute w-full h-full pointer-events-none">
                  <path 
                    d="M 100 250 Q 250 100 400 200 T 700 300" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    strokeDasharray="8 8"
                    className="text-primary/40"
                  />
                  <circle cx="100" cy="250" r="6" fill="#10b981" />
                  <circle cx="700" cy="300" r="6" fill="#3b82f6" />
                </svg>

                <div className="z-10 text-center space-y-2">
                  <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-border shadow-xl">
                    <Truck className="w-8 h-8 text-primary mx-auto mb-2 animate-bounce" />
                    <p className="font-semibold text-foreground">Vehicle in Transit</p>
                    <p className="text-xs text-muted-foreground">Approx. 4.2 km from next stop</p>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 flex gap-2">
                  <div className="bg-background/90 backdrop-blur p-2 rounded-lg border border-border text-[10px] font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div> START
                  </div>
                  <div className="bg-background/90 backdrop-blur p-2 rounded-lg border border-border text-[10px] font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div> DESTINATION
                  </div>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Delivery Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-transparent">
                  {steps.map((step, index) => (
                    <div key={index} className="relative flex items-start group">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background border-2 border-border z-10 transition-colors group-hover:border-primary/50">
                        {step.status === 'completed' ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : step.status === 'current' ? (
                          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-muted" />
                        )}
                      </div>
                      <div className="ml-6 pt-1">
                        <div className="flex items-center gap-3 mb-1">
                          <p className={`font-bold ${step.status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'}`}>
                            {step.title}
                          </p>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {step.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Post-Delivery Feedback */}
            {isDelivered && (
              <Card className="border-primary/20 bg-primary/5 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary fill-primary" />
                    How was your delivery?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isSubmitted ? (
                    <div className="text-center py-6 animate-in fade-in zoom-in duration-300">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">Thank you for your feedback!</h3>
                      <p className="text-sm text-muted-foreground">Your review helps us improve the community support network.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex flex-col items-center gap-3">
                        <p className="text-sm font-medium text-muted-foreground">Rate your experience</p>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              className="transition-transform hover:scale-110 active:scale-95"
                            >
                              <Star
                                className={`w-8 h-8 ${
                                  star <= (hoveredRating || rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comment">Your Review</Label>
                        <Textarea
                          id="comment"
                          placeholder="Tell us what went well or how we can improve..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="min-h-[100px] bg-background"
                        />
                      </div>

                      <Button 
                        className="w-full" 
                        disabled={rating === 0 || !comment.trim() || isSubmitting}
                        onClick={async () => {
                          if (!user) {
                            toast({ title: "Please log in", description: "You need to be logged in to leave feedback.", variant: "destructive" });
                            return;
                          }
                          setIsSubmitting(true);
                          try {
                            await apiFetch("/feedback", {
                              method: "POST",
                              body: JSON.stringify({ rating, comment, userId: user.id }),
                            });
                            setIsSubmitted(true);
                            toast({ title: "Feedback submitted!", description: "We appreciate your kind words." });
                          } catch (error) {
                            toast({ title: "Error submitting feedback", description: error instanceof Error ? error.message : "Try again later", variant: "destructive" });
                          } finally {
                            setIsSubmitting(false);
                          }
                        }}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Feedback"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar: Details & Driver */}
          <div className="space-y-8">
            {/* Driver Info */}
            <Card className="border-border overflow-hidden bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Assigned Driver</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Johnathan Smith</p>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <ShieldCheck className="w-3 h-3 text-green-500" />
                      Verified Professional
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="secondary" size="sm" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">Message</Button>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Details */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-tight text-muted-foreground mb-1">Destination</p>
                    <p className="text-sm font-medium text-foreground">Community Center, North Hills, NY 10012</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-tight text-muted-foreground mb-1">Items</p>
                    <p className="text-sm font-medium text-foreground">3x Winter Blankets, 1x Medical Kit</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-muted-foreground font-medium">Est. Delivery</p>
                    <p className="text-sm font-bold text-primary">Today, 4:30 PM</p>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[65%]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 rounded-xl bg-orange-100/10 border border-orange-200/20 text-orange-800 dark:text-orange-200">
               <p className="text-xs font-bold flex items-center gap-2 italic">
                 <ShieldCheck className="w-4 h-4" />
                 Secure Handover required. Please have your verification code ready at arrival.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
