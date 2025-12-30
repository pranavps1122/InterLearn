import React from "react";
import { REVIEWER_ROUTES } from "@/constants/Routes/reviewer.routes";
import ReviewerPublicRoute from "../../guards/PublicRoute";
import { AppRoute } from "@/routes/route.types";

const ReviewerLogin = React.lazy(
  () => import("@/pages/ReviewerLogin/ReviewerLogin")
);

export const ReviewerPublicRoutes: AppRoute[] = [
  {
    path: REVIEWER_ROUTES.LOGIN,
    element: <ReviewerLogin />,
    guard: ReviewerPublicRoute,
  },
];
