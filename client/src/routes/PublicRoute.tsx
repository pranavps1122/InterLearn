import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/store";

interface PublicRouteProps {
  children: React.ReactElement;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.auth
  );

  if (isAuthenticated || token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
