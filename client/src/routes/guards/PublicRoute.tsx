import { Navigate, useLocation } from "react-router-dom";
import { useAuthStatus } from "@/core/hooks/useAuthStatus";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, role, authChecked } = useAuthStatus();


  if (!authChecked) return null;

  if (isAuthenticated) {
    if (role === "admin") return <Navigate to="/admin/reviewer-management" replace />;
    if (role === "reviewer") return <Navigate to="/reviewer/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
