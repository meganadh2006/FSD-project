import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[];
};

const getDashboardRoute = (role: string) => {
  const normalizedRole = role.toLowerCase();

  if (normalizedRole === "admin") return "/admin";
  if (normalizedRole === "donor") return "/donor";
  if (normalizedRole === "recipient") return "/recipient";
  if (normalizedRole === "logistics") return "/logistics";

  return "/";
};

export const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Checking your session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role.toUpperCase())
  ) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  return <>{children}</>;
};
