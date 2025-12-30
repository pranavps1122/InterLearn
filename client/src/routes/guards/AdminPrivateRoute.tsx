import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStatus } from "@/core/hooks/useAuthStatus";

interface Props { children: React.ReactElement; }

export default function AdminPrivateRoute({ children }: Props) {
 const {isAuthenticated,role} = useAuthStatus()

  const location = useLocation();
  if (!isAuthenticated||role!=='admin') {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
