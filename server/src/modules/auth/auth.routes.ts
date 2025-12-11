import { Router } from "express";
import AuthController from "./auth.controller";

const authRoute = Router();
const authController = new AuthController();

authRoute.post(
  "/register/request-otp",
  (req, res, next) => authController.requestOtp(req, res, next)
);

authRoute.post(
  "/register/resend-otp",
  (req, res, next) => authController.resendOtp(req, res, next)
);

authRoute.post(
  "/register/verify",
  (req, res, next) => authController.verifyRegister(req, res, next)
);

authRoute.post(
  "/login",
  (req, res, next) => authController.login(req, res, next)
);

authRoute.post(
  "/google",
  (req, res, next) => authController.googleLogin(req, res, next)
);

authRoute.get("/refresh-token", authController.refreshToken.bind(authController));

authRoute.post(
  "/forgot-password",
  (req, res, next) => authController.forgotPasswordOtp(req, res, next)
);

authRoute.post(
  "/verify-forgot-password",
  (req, res, next) => authController.forgotPasswordVerification(req, res, next)
);

authRoute.post(
  "/reset-password",
  (req, res, next) => authController.forgotPassword(req, res, next)
);

export default authRoute;
