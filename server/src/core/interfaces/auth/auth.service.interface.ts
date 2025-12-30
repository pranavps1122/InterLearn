import { IAuthLoginService } from "./auth-login.interface";
import { IAuthOtpService } from "./auth-otp.interface";
import { IAuthPasswordService } from "./auth-password.interface"
import { IAuthUserService } from "./auth-user.interface";

export interface IAuthService
  extends
    IAuthLoginService,
    IAuthOtpService,
    IAuthPasswordService,
    IAuthUserService {}
