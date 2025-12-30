import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "../../store/store";
import { useAuthStatus } from "@/core/hooks/useAuthStatus";


interface Props { children: React.ReactElement; }

export default function UserPrivateRoute({ children }: Props) {
  const {isAuthenticated,role}=useAuthStatus()
  const location = useLocation();
  if (!isAuthenticated||role!=='student') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
