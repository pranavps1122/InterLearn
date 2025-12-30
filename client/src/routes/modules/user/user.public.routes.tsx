import React from "react";
import { USER_ROUTES } from "@/constants/Routes/user.routes";
import PublicRoute from "@/routes/guards/PublicRoute";
import { AppRoute } from "@/routes/route.types";

const Landing = React.lazy(() => import("@/pages/Landing/LandingPage/Landing"));
const Register = React.lazy(() => import("@/pages/Register/register"));
const VerifyOtp = React.lazy(() => import("@/pages/Verify-Otp/verify-otp"));
const Login = React.lazy(() => import("@/pages/Login/login"));
const ForgotPassword = React.lazy(() => import("@/pages/ForgotPassword/forgotPassword"));
const VerifyForgotPassword = React.lazy(() => import("@/pages/ForgotPassword/VerifyForgotOtp"));
const ResetPassword = React.lazy(() => import("@/pages/ForgotPassword/resetPassword"));
const BecomeReviewer = React.lazy(() => import("@/pages/BecomeReviewer/BecomeReviwer"));
const MainLayout = React.lazy(() => import("@/components/layouts/MainLayout"));
const NotFoundPage = React.lazy(()=>import('@/pages/NotFoundPage/NotFoundPage'))


export const UserPublicRoutes: AppRoute []=[

 {
    path: USER_ROUTES.ROOT,
    layout: MainLayout,
    children: [
       {
        index: true,
        element: <Landing />, 
      },
      {
        path: USER_ROUTES.CHILD.LOGIN,
        element: <Login />,
        guard:PublicRoute,
      },
      {
        path: USER_ROUTES.CHILD.REGISTER,
        element: <Register />,
        guard:PublicRoute,
      },
      {
        path: USER_ROUTES.CHILD.REGISTER_VERIFY_OTP,
        element: <VerifyOtp />,
        guard:PublicRoute
      },
      {
        path: USER_ROUTES.CHILD.FORGOT_PASSWORD,
        element: <ForgotPassword />,
        guard:PublicRoute
      },
      {
        path: USER_ROUTES.CHILD.RESET_PASSWORD_VERIFY_OTP,
        element: <VerifyForgotPassword />,
        guard:PublicRoute
      },
      {
        path: USER_ROUTES.CHILD.RESET_PASSWORD,
        element: <ResetPassword />,
        guard:PublicRoute
      },
      {
        path: USER_ROUTES.CHILD.BECOME_REVIEWER,
        element: <BecomeReviewer />,
      },
    
    ],
  },

    
]
