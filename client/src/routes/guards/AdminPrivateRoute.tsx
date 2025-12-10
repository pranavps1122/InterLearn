import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "../../store/store";

interface Props { children: React.ReactElement; }

export default function AdminPrivateRoute({ children }: Props) {
  const admin = useSelector((state: RootState) => state.admin.admin);
  console.log('admin route',admin)
  const location = useLocation();
  if (!admin) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }
  return children;
}
