import AuthController from "./controllers/auth.controller";
import AuthService from "./services/auth.service";
import { UserRepository } from "./repository/user.repository";
import OtpService from "./services/otp.service";
import { OAuth2Client } from "google-auth-library";

import { AuthTokenService } from "./services/auth-token.service";
import { JwtTokenProvider } from "@/core/providers/jwt-token.provider";
import { RefreshTokenRepository } from "./repository/refresh-token.repo";

const userRepository = new UserRepository();
const otpService = new OtpService();
const refreshTokenRepo = new RefreshTokenRepository();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
if (!GOOGLE_CLIENT_ID) {
  throw new Error("Google client id not provided");
}

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);


const tokenProvider = new JwtTokenProvider();
const authTokenService = new AuthTokenService(
  tokenProvider,
  refreshTokenRepo);


const authService = new AuthService(
  userRepository,
  otpService,
  googleClient,
  authTokenService,
  refreshTokenRepo
);


const authController = new AuthController(
  authService,
  authTokenService);

export { authController };
