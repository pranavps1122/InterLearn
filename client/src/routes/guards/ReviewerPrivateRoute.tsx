import { Navigate } from "react-router-dom";
import { useAuthStatus } from "@/core/hooks/useAuthStatus";

export default function ReviewerPrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, role, authChecked } = useAuthStatus();

  if (!authChecked) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (role !== "reviewer") return <Navigate to="/" replace />;

  return <>{children}</>;
}
