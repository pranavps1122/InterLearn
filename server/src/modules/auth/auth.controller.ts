import { Request, Response, NextFunction, Router } from "express";
import AuthService from "./auth.service"
import { SuccessResponse } from "@/core/utils/response";
import { HTTP_STATUS } from "@/core/constants/httpStatus";

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
      return res
        .status(HTTP_STATUS.CREATED)
        .json(SuccessResponse(result.message, { id: result.user.id, token: result.token ?? null }, HTTP_STATUS.CREATED));
    } catch (err) {
      return next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.userLogin(req.body);
      return res.status(HTTP_STATUS.OK).json(SuccessResponse(result.message, result, HTTP_STATUS.OK));
    } catch (err) {
      return next(err);
    }
  }


  async googleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.googleAuthLogin(req.body);
      return res.status(HTTP_STATUS.OK).json(SuccessResponse(result.message, result, HTTP_STATUS.OK));
    } catch (err) {
      return next(err);
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
