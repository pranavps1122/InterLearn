import { Router } from "express";
import AuthController from "./auth.controller";

const authRoute = Router();
const authController = new AuthController();

authRoute.post(
  "/register/request-otp",
  (req, res) => authController.requestOtp(req, res)
);

authRoute.post(
  "/register/verify",
  (req, res) => authController.verifyRegister(req, res)
);

authRoute.post(
  "/login",
  (req, res) => authController.login(req, res)
);

export default authRoute;
