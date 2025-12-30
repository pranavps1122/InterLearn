import React from "react";
import { ADMIN_ROUTES } from "@/constants/Routes/admin.routes";
import AdminLayout from "@/components/layouts/AdminLayout";
import { AdminPrivateRoute } from "../../guards";
import { AppRoute } from "../../../routes/route.types";

const ReviewerManagementDashboard = React.lazy(()=>import('../../../pages/Admin/Dashboard/ReviewersManagement/ReviewerManagement'))
const UserManagementDashboard = React.lazy(()=>import('../../../pages/Admin/Dashboard/UserManagement/UserManagement'))
const PendingApplicationDashboard = React.lazy(()=>import('../../../pages/Admin/Dashboard/ReviewersManagement/ReviewerPending'))



export const AdminPrivateRoutes :AppRoute [] = [
  {
    path: ADMIN_ROUTES.ROOT,
    layout: AdminLayout,
    guard: AdminPrivateRoute,
    children: [
      {
        path:ADMIN_ROUTES.CHILD.PENDING_APPLICATIONS,
        element: <PendingApplicationDashboard />,
      },
      {
        path: ADMIN_ROUTES.CHILD.USER_MANAGEMENT,
        element: <UserManagementDashboard />,
      },
      {
        path: ADMIN_ROUTES.CHILD.REVIEWER_MANAGEMENT,
        element: <ReviewerManagementDashboard />,
      },
    ],
  },
];