import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "../../store/store";


interface Props { children: React.ReactElement; }

export default function ReviewerPrivateRoute({ children }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log('user private',user)
  const location = useLocation();
  if (!user) {
    return <Navigate to="/reviewer/login" replace state={{ from: location }} />;
  }
  return children;
}
