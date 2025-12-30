import React from "react";
import { ADMIN_ROUTES } from "@/constants/Routes/admin.routes";
import { PublicRoute } from "@/routes/guards";
import {AppRoute} from '../../../routes/route.types'

const AdminLogin = React.lazy(()=>import('../../../pages/Admin/adminLogin'))



export const AdminPublicRoutes : AppRoute [] = [
  {
    path: ADMIN_ROUTES.LOGIN,
    element: <AdminLogin />,
    guard: PublicRoute,
  },

];
