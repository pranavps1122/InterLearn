import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../store/store";

interface Props { children: React.ReactElement; }

export default function AdminPublicRoute({ children }: Props) {
  const admin = useSelector((state: RootState) => state.admin.admin);
  if (admin) return <Navigate to="/admin/reviewer-management" replace />;
  return children;
}
