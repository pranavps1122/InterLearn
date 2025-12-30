import React from "react";
import { USER_ROUTES } from "@/constants/Routes/user.routes";
import { AppRoute } from "@/routes/route.types";
import MainLayout from "@/components/layouts/MainLayout";
import { UserPrivateRoute } from "@/routes/guards";
import ReviewerManagement from "@/pages/Admin/Dashboard/ReviewersManagement/ReviewerManagement";

export const UserPrivateRoutes :AppRoute [] = [
  {
    path: USER_ROUTES.ROOT,
    layout:MainLayout ,
    guard: UserPrivateRoute,
    children: [
      {
        path:USER_ROUTES.CHILD.PROFILE,
        element:<ReviewerManagement/>,
      },
     
    ],
  },
];