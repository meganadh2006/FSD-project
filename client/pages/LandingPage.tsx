import { Header } from "@/components/Header";
import { footerSections, howItWorksSteps, landingStatsFallback, testimonials } from "@/data/siteContent";
import { drivesApi } from "@/lib/api";
import type { Drive } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Gift, Heart, Package, Star, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { data: drives } = useQuery({
    queryKey: ["drives"],
    queryFn: drivesApi.getAll,
  });

  const displayDrives = (drives || []).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="container relative py-20 md:py-32">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                  Help Others.
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {" "}
                    Make a Difference.
                  </span>
                </h1>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                  ReliefLink connects donors with people in need during emergencies
                  and ongoing crises. Donate essential items, track impact, and
                  build a community of care.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                >
                  <Link to="/signup">
                    Start Donating <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                  asChild
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-border pt-8">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {landingStatsFallback.activeDonors}
                  </div>
                  <p className="text-sm text-muted-foreground">Active Donors</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">
                    {landingStatsFallback.peopleHelped}
                  </div>
                  <p className="text-sm text-muted-foreground">People Helped</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">
                    {drives?.length || landingStatsFallback.activeDrives}
                  </div>
                  <p className="text-sm text-muted-foreground">Active Drives</p>
                </div>
              </div>
            </div>

            <div className="hidden items-center justify-center md:flex">
              <div className="relative flex h-96 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="space-y-6 px-8">
                  <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
                    <Gift className="h-8 w-8 flex-shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">Food & Supplies</p>
                      <p className="text-xs text-muted-foreground">45 donors active</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
                    <Package className="h-8 w-8 flex-shrink-0 text-secondary" />
                    <div>
                      <p className="text-sm font-semibold">Emergency Support</p>
                      <p className="text-xs text-muted-foreground">In progress</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
                    <Truck className="h-8 w-8 flex-shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-semibold">Fast Delivery</p>
                      <p className="text-xs text-muted-foreground">Within 48 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-t border-border bg-card py-20 md:py-32"
      >
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              How ReliefLink Works
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Simple, transparent, and impactful. Get started in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map(({ step, title, description, icon: Icon }) => (
              <div key={step} className="relative">
                <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-white">
                  {step}
                </div>
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <Icon className="mb-4 h-8 w-8 text-primary" />
                    <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </CardContent>
                </Card>
                {step < 4 && (
                  <div className="absolute -right-4 top-6 z-0 hidden lg:block">
                    <ArrowRight className="h-8 w-8 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="drives" className="py-20 md:py-32">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Active Donation Drives
            </h2>
            <p className="mx-auto text-muted-foreground">
              Contribute to ongoing relief efforts
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {displayDrives.length > 0 ? (
              displayDrives.map((drive: Drive) => (
                <Card
                  key={drive.id}
                  className="overflow-hidden border-border transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <h3 className="font-semibold text-foreground">{drive.title}</h3>
                      <Package className="h-5 w-5 flex-shrink-0 text-primary" />
                    </div>

                    <p className="mb-4 text-sm text-muted-foreground">
                      {drive.location}
                    </p>

                    <div className="mb-4 space-y-2">
                      <p className="text-xs font-semibold">Items Needed:</p>
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {drive.itemsNeeded}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Contribute <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No active drives at the moment.
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5"
              asChild
            >
              <Link to="/drives">View All Drives</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-20 md:py-32">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Community Stories
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Real impact from people like you
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-4 w-4 fill-accent text-accent"
                      />
                    ))}
                  </div>

                  <p className="mb-6 italic text-foreground">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-semibold text-white">
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

      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20 md:py-32">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Ready to Make an Impact?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Join thousands of donors and recipients in building a network of care
            and relief.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
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

      <footer className="border-t border-border bg-card py-12">
        <div className="container">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-r from-primary to-secondary p-2">
                  <Heart className="h-5 w-5 fill-white text-white" />
                </div>
                <span className="font-bold text-foreground">ReliefLink</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting donors with those in need.
              </p>
            </div>

            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="mb-4 font-semibold text-foreground">{section.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link
                          to={link.href}
                          className="transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 ReliefLink. All rights reserved. Built with care for those in need.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
