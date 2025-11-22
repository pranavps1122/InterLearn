import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/LandingPage/Landing";
import Register from "./pages/Register/register";
import VerifyOtp from "./pages/Verify-Otp/verify-otp";
import Login from "./pages/Login/login";
import BecomeReviewer from "./pages/BecomeReviewer/BecomeReviwer";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";
import MainLayout from "./components/layouts/Header/MainLayout";
import PublicRoute from "./routes/PublicRoute";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>

          {/* Public pages should redirect if user is logged in */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/register/verify-otp"
            element={
              <PublicRoute>
                <VerifyOtp />
              </PublicRoute>
            }
          />

          {/* Normal Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/become-reviewer" element={<BecomeReviewer />} />

        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          closeOnClick={false}
          pauseOnHover
          pauseOnFocusLoss
          draggable
          transition={Slide}
        />
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
