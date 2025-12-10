import { Route } from "react-router-dom";
import PublicRoute from "../guards/PublicRoute";
import MainLayout from "../../components/layouts/MainLayout";
import Landing from "../../pages/Landing/LandingPage/Landing";
import Login from "../../pages/Login/login";
import Register from "../../pages/Register/register";
import VerifyOtp from "../../pages/Verify-Otp/verify-otp";

export default function UserRoutes() {
  return (
    <Route element={<MainLayout />}>
      <Route index element={<Landing />} />

      <Route
        path="login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="register/verify-otp"
        element={
          <PublicRoute>
            <VerifyOtp />
          </PublicRoute>
        }
      />
    </Route>
  );
}
