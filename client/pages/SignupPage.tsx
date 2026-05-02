import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import type { AuthResponse } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Heart, Gift, Truck, ClipboardList } from "lucide-react";

const Signup = () => {
  const [step, setStep] = useState<"role" | "details">("role");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { loginSession } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const roles = [
    {
      id: "donor",
      title: "Donor",
      description: "Contribute items and help those in need",
      icon: Gift,
    },
    {
      id: "recipient",
      title: "Recipient",
      description: "Request essential items during emergencies",
      icon: Heart,
    },
    {
      id: "logistics",
      title: "Logistics Coordinator",
      description: "Manage pickups and deliveries",
      icon: Truck,
    },
    {
      id: "admin",
      title: "Admin",
      description: "Manage platform and approve listings",
      icon: ClipboardList,
    },
  ];

  const handleChangeDetails = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (!selectedRole) {
      toast({
        title: "Validation Error",
        description: "Please select a role",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const mappedRole = selectedRole.toUpperCase();
      
      const response = await apiFetch<AuthResponse>('/users/register', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: mappedRole
        })
      });

      loginSession(response.token, {
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role
      });

      toast({
        title: "Account Created",
        description: "Welcome to ReliefLink!",
      });

      const roleStr = response.role.toLowerCase();
      if (roleStr === 'admin') navigate('/admin');
      else if (roleStr === 'donor') navigate('/donor');
      else if (roleStr === 'recipient') navigate('/recipient');
      else if (roleStr === 'logistics') navigate('/logistics');
      else navigate('/');

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-20">
        {step === "role" ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                Join ReliefLink
              </h1>
              <p className="text-lg text-muted-foreground">
                Select your role to get started
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <Card
                    key={role.id}
                    className={`cursor-pointer border-2 transition-all ${
                      selectedRole === role.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <CardContent className="p-6">
                      <Icon className="w-8 h-8 text-primary mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {role.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {role.description}
                      </p>
                      <Button
                        size="sm"
                        variant={
                          selectedRole === role.id ? "default" : "outline"
                        }
                        className={
                          selectedRole === role.id
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                            : "border-primary text-primary hover:bg-primary/5"
                        }
                      >
                        {selectedRole === role.id ? "Selected" : "Select"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                onClick={() => setStep("details")}
                disabled={!selectedRole}
                className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
              >
                Continue
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <Card className="border-border">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl">Create Your Account</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Signing up as{" "}
                  <span className="font-semibold text-primary">
                    {
                      roles.find((r) => r.id === selectedRole)?.title
                    }
                  </span>
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChangeDetails}
                      placeholder="Your name"
                      className="border-border bg-background"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChangeDetails}
                      placeholder="you@example.com"
                      className="border-border bg-background"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Password
                    </label>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChangeDetails}
                      placeholder="********"
                      className="border-border bg-background"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChangeDetails}
                      placeholder="********"
                      className="border-border bg-background"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>

                <p className="text-sm text-center text-muted-foreground mt-6">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>

                <Button
                  variant="ghost"
                  onClick={() => setStep("role")}
                  className="w-full mt-2 text-muted-foreground hover:text-foreground"
                >
                  Back to Role Selection
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
