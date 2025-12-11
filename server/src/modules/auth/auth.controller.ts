import { Request, Response, NextFunction, Router } from "express";
import AuthService from "./auth.service"
import { SuccessResponse } from "@/core/utils/response";
import { HTTP_STATUS } from "@/core/constants/httpStatus";
import jwt from "jsonwebtoken";
import {generateAccessToken} from '@/core/utils'


export default class AuthController {
  public router = Router();
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async requestOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.requestRegisterOtp(req.body);
      return res.status(HTTP_STATUS.OK).json(SuccessResponse(result.message, null, HTTP_STATUS.OK));
    } catch (err) {
      console.log('error while request otp',err)
      return next(err);
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.resendOtp(req.body);
      return res.status(HTTP_STATUS.OK).json(SuccessResponse(result.message, null, HTTP_STATUS.OK));
    } catch (err) {
      return next(err);
    }
  }

  async verifyRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.verifyAndRegister(req.body);
      const id = typeof result.user.id === "string" ? result.user.id : result.user.id.toString();
      return res
        .status(HTTP_STATUS.CREATED)
        .json(SuccessResponse(result.message, { id}, HTTP_STATUS.CREATED));
    } catch (err) {
      return next(err);
    }
      }

    async login(req: Request, res: Response, next: NextFunction) {
      try {
        const result = await this.authService.userLogin(req.body);
        console.log('backend login',result)
       
        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? "strict" : "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const { refreshToken, ...safeResult } = result;

        return res
          .status(HTTP_STATUS.OK)
          .json(
            SuccessResponse(safeResult.message, {
              accessToken: safeResult.accessToken,
              user: safeResult.user,
            }, HTTP_STATUS.OK)
          );
      } catch (err) {
        return next(err);
      }
    }



 async googleLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await this.authService.googleAuthLogin(req.body);
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { refreshToken, ...safeResult } = result;

    return res
      .status(HTTP_STATUS.OK)
      .json(SuccessResponse(safeResult.message, {
        accessToken: safeResult.accessToken,
        user: safeResult.user,
      }, HTTP_STATUS.OK));
  } catch (err) {
    return next(err);
  }
}



async refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "No refresh token found" });
    }

    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as any;

    const newAccessToken = generateAccessToken({
      id: payload.id,
      role: payload.role,
    });

    return res.json({ accessToken: newAccessToken });

  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
}



  async forgotPasswordOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.forgotPasswordOtp(req.body);
      return res.status(HTTP_STATUS.OK).json(SuccessResponse(result.message, null, HTTP_STATUS.OK));
    } catch (err) {
      return next(err);
    }
  }

  async forgotPasswordVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.forgotPasswordOtpVerification(req.body);
      return res.status(HTTP_STATUS.OK).json(SuccessResponse(result.message, null, HTTP_STATUS.OK));
    } catch (err) {
      return next(err);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.changeForgotPassword(req.body);
      return res.status(HTTP_STATUS.OK).json(SuccessResponse(result.message, null, HTTP_STATUS.OK));
    } catch (err) {
      return next(err);
    }
  }
}
