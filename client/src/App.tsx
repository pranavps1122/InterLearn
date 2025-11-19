import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./pages/Register/register";
import VerifyOtp from "./pages/Verify-Otp/verify-otp"
import Login from './pages/Login/login'
import { ToastContainer, Slide } from "react-toastify";
import './toast.css'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/register/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />

        
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
    </BrowserRouter>
  );
};


export default App;
