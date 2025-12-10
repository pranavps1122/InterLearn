
import React, { LazyExoticComponent } from "react";


export type AppRoute = {
  path?: string;
  index?: boolean;
  element?: React.ReactElement | null;
  layout?: React.ComponentType<any> | undefined; 
  guard?: (node: React.ReactElement) => React.ReactElement; 
  children?: AppRoute[];
};

const Landing = React.lazy(() => import("../pages/Landing/LandingPage/Landing"));
const Register = React.lazy(() => import("../pages/Register/register"));
const VerifyOtp = React.lazy(() => import("../pages/Verify-Otp/verify-otp"));
const Login = React.lazy(() => import("../pages/Login/login"));
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword/forgotPassword"));
const VerifyForgotPassword = React.lazy(() => import("../pages/ForgotPassword/VerifyForgotOtp"));
const ResetPassword = React.lazy(() => import("../pages/ForgotPassword/resetPassword"));

const BecomeReviewer = React.lazy(() => import("../pages/BecomeReviewer/BecomeReviwer"));
const ReviewerLogin = React.lazy(() => import("../pages/ReviewerLogin/ReviewerLogin"));

const AdminLogin = React.lazy(() => import("../pages/Admin/adminLogin"));
const ReviewerManagement = React.lazy(() => import("../pages/Admin/Dashboard/ReviewerManagement"));


const MainLayout = React.lazy(() => import("../components/layouts/MainLayout"));
const ReviewerLayout = React.lazy(() => import("../components/common/ReviewerLayout/reviewerLayout"));
const AdminLayout = React.lazy(() => import("../components/layouts/AdminLayout"));


import PublicRoute from "../routes/guards/PublicRoute";
import AdminPrivateRoute from "../routes/guards/AdminPrivateRoute";
import AdminPublicRoute from "../routes/guards/AdminPublicRoute";

const routes: AppRoute[] = [
  {
    path: "/",
    layout: MainLayout,
    children: [
      { index: true, path: "/", element: <Landing /> },
      {
        path: "/login",
        element: <Login />,
        guard: (node) => <PublicRoute>{node}</PublicRoute>,
      },
      {
        path: "/register",
        element: <Register />,
        guard: (node) => <PublicRoute>{node}</PublicRoute>,
      },
      {
        path: "/register/verify-otp",
        element: <VerifyOtp />,
        guard: (node) => <PublicRoute>{node}</PublicRoute>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
        guard: (node) => <PublicRoute>{node}</PublicRoute>,
      },
      {
        path: "/reset-password/verify-otp",
        element: <VerifyForgotPassword />,
        guard: (node) => <PublicRoute>{node}</PublicRoute>,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
        guard: (node) => <PublicRoute>{node}</PublicRoute>,
      },
      {
        path: "/become-reviewer",
        element: <BecomeReviewer />
      }
    ],
  },

  // reviewer (no header login)
  {
    path: "/reviewer/login",
    element: <ReviewerLogin />
  },

  // reviewer dashboard with reviewer layout
  {
    path: "/reviewer",
    layout: ReviewerLayout,
    children: [
      { path: "dashboard", element: <div>Reviewer Dashboard</div> },
      { path: "submissions", element: <div>Submissions</div> },
      { path: "reviews", element: <div>My Reviews</div> },
      { path: "reports", element: <div>Reports</div> },
    ],
  },

  // admin
  {
    path: "/admin/login",
    element: <AdminLogin />,
    guard: (node) => <AdminPublicRoute>{node}</AdminPublicRoute>,
  },
  {
    path: "/admin",
    layout: AdminLayout,
    guard: (node) => <AdminPrivateRoute>{node}</AdminPrivateRoute>,
    children: [
      { path: "reviewer-management", element: <ReviewerManagement /> },
      // add other admin child routes here
    ],
  },
];

export default routes;
