import { Router } from "express";
import { authController } from "../auth.module";
import { protect, authorize } from "@/core/middleware/auth.middleware";
import { ROLE } from "@/core/constants/roles";
import { asyncHandler } from "@/core/middleware/async-handler.middleware";
import { validate } from "@/core/middleware/validate.middleware";
import { userRegisterSchema } from "../validation/user-register.schema";

const authRoute = Router();

// ---------- REGISTER FLOW ----------

// request OTP
authRoute.post(
  "/register/request-otp",
  validate(userRegisterSchema),
  asyncHandler(authController.requestOtp.bind(authController))
);

// resend OTP
authRoute.post(
  "/register/resend-otp",
  asyncHandler(authController.resendOtp.bind(authController))
);

// verify register otp
authRoute.post(
  "/register/verify",
  asyncHandler(authController.verifyRegister.bind(authController))
);

// ---------- LOGIN FLOWS ----------

authRoute.post(
  "/admin/login",
  asyncHandler(authController.loginWithRole(ROLE.ADMIN).bind(authController))
);

authRoute.post(
  "/reviewer/login",
  asyncHandler(authController.loginWithRole(ROLE.REVIEWER).bind(authController))
);

authRoute.post(
  "/login",
  asyncHandler(authController.loginWithRole(ROLE.STUDENT).bind(authController))
);

// ---------- SOCIAL LOGIN ----------

authRoute.post(
  "/google",
  asyncHandler(authController.googleLogin.bind(authController))
);

// ---------- AUTH USER ----------

authRoute.get(
  "/me",
  protect,
  asyncHandler(authController.getMe.bind(authController))
);

// ---------- REFRESH TOKEN ----------

authRoute.post(
  "/refresh-token",
  asyncHandler(authController.refreshToken.bind(authController))
);

// ---------- FORGOT PASSWORD FLOW ----------

authRoute.post(
  "/forgot-password",
  asyncHandler(authController.forgotPasswordOtp.bind(authController))
);

authRoute.post(
  "/verify-forgot-password",
  asyncHandler(authController.forgotPasswordVerification.bind(authController))
);

authRoute.post(
  "/reset-password",
  asyncHandler(authController.forgotPassword.bind(authController))
);

// ---------- LOGOUT ----------

authRoute.post(
  "/logout",
  asyncHandler(authController.logout.bind(authController))
);

export default authRoute;
