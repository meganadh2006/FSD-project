import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboardPage";
import DonorDashboard from "./pages/DonorDashboardPage";
import RecipientDashboard from "./pages/RecipientDashboardPage";
import LogisticsDashboard from "./pages/LogisticsDashboardPage";
import TrackOrder from "./pages/TrackOrderPage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import EmergencyDrives from "./pages/EmergencyDrivesPage";
import NotFound from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { AuthProvider } from "./lib/auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/donor"
              element={
                <ProtectedRoute allowedRoles={["DONOR"]}>
                  <DonorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipient"
              element={
                <ProtectedRoute allowedRoles={["RECIPIENT"]}>
                  <RecipientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logistics"
              element={
                <ProtectedRoute allowedRoles={["LOGISTICS"]}>
                  <LogisticsDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/track/:id" element={<TrackOrder />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/drives" element={<EmergencyDrives />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
