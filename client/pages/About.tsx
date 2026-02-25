import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-20">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">About ReliefLink</h1>
            <p className="text-lg text-muted-foreground">
              Connecting compassion with action to help those in need
            </p>
          </div>

          <Card className="border-border">
            <CardContent className="pt-8 space-y-6 prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                ReliefLink is a mission-driven platform that bridges the gap
                between generous donors and communities in crisis. We believe that
                in times of emergency, the fastest way to provide help is by
                connecting willing donors with those who need immediate assistance.
              </p>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To empower communities by creating a transparent, efficient, and
                  compassionate platform that enables donations and relief efforts
                  during natural disasters and emergencies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Our Values
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Transparency:</strong> Every
                    donation is tracked and verified
                  </li>
                  <li>
                    <strong className="text-foreground">Efficiency:</strong> Fast
                    matching and delivery of relief items
                  </li>
                  <li>
                    <strong className="text-foreground">Community:</strong> Building
                    networks of care and support
                  </li>
                  <li>
                    <strong className="text-foreground">Accessibility:</strong>{" "}
                    Available to everyone, regardless of background
                  </li>
                </ul>
              </div>

              <p className="text-muted-foreground italic border-l-4 border-primary pl-4">
                "In the face of adversity, humanity shines brightest. ReliefLink is
                our platform for that light to spread faster."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
