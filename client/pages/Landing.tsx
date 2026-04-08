import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Package,
  Truck,
  Users,
  ArrowRight,
  Star,
  Gift,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="container relative py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Help Others.
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {" "}
                    Make a Difference.
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground mt-6 leading-relaxed max-w-lg">
                  ReliefLink connects donors with people in need during emergencies
                  and ongoing crises. Donate essential items, track impact, and
                  build a community of care.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  asChild
                >
                  <Link to="/signup">
                    Start Donating <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                <div>
                  <div className="text-2xl font-bold text-primary">2.5K+</div>
                  <p className="text-sm text-muted-foreground">Active Donors</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">1.8K+</div>
                  <p className="text-sm text-muted-foreground">People Helped</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">12</div>
                  <p className="text-sm text-muted-foreground">Active Drives</p>
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="space-y-6 px-8">
                  <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm">
                    <Gift className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Food & Supplies</p>
                      <p className="text-xs text-muted-foreground">45 donors active</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm">
                    <Package className="w-8 h-8 text-secondary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Emergency Support</p>
                      <p className="text-xs text-muted-foreground">In progress</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm">
                    <Truck className="w-8 h-8 text-accent flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Fast Delivery</p>
                      <p className="text-xs text-muted-foreground">Within 48 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 md:py-32 bg-card border-t border-border"
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How ReliefLink Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent, and impactful. Get started in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Sign Up",
                description: "Create your account and choose your role",
                icon: Users,
              },
              {
                step: 2,
                title: "Create or Request",
                description: "Post donations or request essential items",
                icon: Heart,
              },
              {
                step: 3,
                title: "Connect",
                description: "Match with logistics coordinators",
                icon: TrendingUp,
              },
              {
                step: 4,
                title: "Track & Impact",
                description: "Monitor deliveries and see your impact",
                icon: Shield,
              },
            ].map(({ step, title, description, icon: Icon }) => (
              <div key={step} className="relative">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white font-bold mb-4 relative z-10">
                  {step}
                </div>
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <Icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  </CardContent>
                </Card>
                {step < 4 && (
                  <div className="hidden lg:block absolute top-6 -right-4 z-0">
                    <ArrowRight className="w-8 h-8 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Drives Section */}
      <section id="drives" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Active Donation Drives
            </h2>
            <p className="text-muted-foreground max-x-2xl mx-auto">
              Contribute to ongoing relief efforts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Flood Relief - City West",
                category: "Food & Water",
                progress: 75,
                donors: 342,
                needed: "$5,000",
                collected: "$3,750",
                status: "in-progress",
              },
              {
                title: "Winter Emergency Fund",
                category: "Clothing & Blankets",
                progress: 45,
                donors: 128,
                needed: "$8,000",
                collected: "$3,600",
                status: "in-progress",
              },
              {
                title: "Medical Supplies Initiative",
                category: "Medicine & Health",
                progress: 90,
                donors: 567,
                needed: "$12,000",
                collected: "$10,800",
                status: "in-progress",
              },
            ].map((drive, index) => (
              <Card key={index} className="overflow-hidden border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-foreground">
                      {drive.title}
                    </h3>
                    <Package className="w-5 h-5 text-primary flex-shrink-0" />
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {drive.category}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted-foreground">
                        {drive.collected}
                      </span>
                      <span className="text-primary font-semibold">
                        {drive.progress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                        style={{ width: `${drive.progress}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-4">
                    {drive.donors} donors • Goal: {drive.needed}
                  </p>

                  <Button
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Contribute <ArrowRight className="ml-2 w-3 h-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5"
            >
              View All Drives
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-card border-t border-border">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Community Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real impact from people like you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Donor",
                content:
                  "ReliefLink made it so easy to donate items during the emergency. I could see exactly where my donations went.",
                avatar: "SJ",
              },
              {
                name: "Ahmed Hassan",
                role: "Recipient",
                content:
                  "When disaster struck, ReliefLink connected me with essential supplies within 48 hours. Truly grateful.",
                avatar: "AH",
              },
              {
                name: "Maria Garcia",
                role: "Logistics Coordinator",
                content:
                  "The platform makes coordination seamless. We managed 500+ deliveries last month efficiently.",
                avatar: "MG",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>

                  <p className="text-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of donors and recipients in building a network of care
            and relief.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <Link to="/signup">Get Started Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-2">
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="font-bold text-foreground">ReliefLink</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting donors with those in need.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>
              © 2024 ReliefLink. All rights reserved. Built with care for those
              in need.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
