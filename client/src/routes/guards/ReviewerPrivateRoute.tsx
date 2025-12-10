import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "../../store/store";

interface Props { children: React.ReactElement; }

export default function ReviewerPrivateRoute({ children }: Props) {
  const reviewer = useSelector((state: RootState) => state.reviewer.reviewer);
  const location = useLocation();
  if (!reviewer) {
    return <Navigate to="/reviewer/login" replace state={{ from: location }} />;
  }
  return children;
}
