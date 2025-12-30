import React from "react";
import { REVIEWER_ROUTES } from "@/constants/Routes/reviewer.routes";
import ReviewerPrivateRoute from "../../guards/ReviewerPrivateRoute";
import ReviewerLayout from "@/components/layouts/ReviewerLayout";
const ReviewerDashboard = React.lazy(
  () => import("@/pages/Reviewer/Dashboard")
);

const UpcomingDashboard = React.lazy(
  () => import("@/pages/Reviewer/Upcomming")
);

import { Outlet } from "react-router-dom";
import { AppRoute } from "@/routes/route.types";
import Profile from "@/pages/Reviewer/Profile";

export const ReviewerPrivateRoutes: AppRoute[] = [
  {
    path: REVIEWER_ROUTES.ROOT,
    layout: ReviewerLayout,
    guard: ReviewerPrivateRoute,
    children: [
      {
        path: REVIEWER_ROUTES.CHILD.DASHBOARD,
        element: <ReviewerDashboard />,
      },
      {
        path: REVIEWER_ROUTES.CHILD.PROFILE,
        element: <Profile />,
      },
      {
        path: REVIEWER_ROUTES.CHILD.UPCOMING,
        element: <UpcomingDashboard />,
      },
    ],
  },
];
