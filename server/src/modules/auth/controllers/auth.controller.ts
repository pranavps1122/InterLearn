import { Request, Response, NextFunction } from "express";
import { IAuthService } from "@/core/interfaces/auth/auth.service.interface";
import {  SuccessResponse } from "@/core/utils/response";
import { HTTP_STATUS } from "@/core/constants/httpStatus";
import {HttpError} from '@/core/errors/httpError'
import { IAuthTokenService } from "@/core/interfaces/auth/auth-token.interface";
import { clearRefreshTokenCookie, setRefreshTokenCookie } from "@/core/utils/cookie.util";
import { ROLE } from "@/core/constants/roles";

export default class AuthController {

  constructor(
    private authService : IAuthService,
    private tokenService : IAuthTokenService
             
  ) 
  {}

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
      const id = typeof result.user.id === "string" ? result.user.id : result.user.id.toString();
      return res
        .status(HTTP_STATUS.CREATED)
        .json(SuccessResponse(result.message, { id}, HTTP_STATUS.CREATED));
    } catch (err) {
      return next(err);
    }
      }

  loginWithRole = (role: ROLE) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Role',role)
      const result = await this.authService.login(
        req.body,
        role,
        req.cookies?.refreshToken
      );
      

      setRefreshTokenCookie(res, result.refreshToken);

      return res.status(HTTP_STATUS.OK).json(
        SuccessResponse(result.message, {
          accessToken: result.accessToken,
          user: result.user,
        })
      );
    } catch (err) {
      next(err);
    }
  };
};



 async googleLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await this.authService.googleLogin(req.body);
    
    setRefreshTokenCookie(res,result.refreshToken)

    return res
      .status(HTTP_STATUS.OK)
      .json(SuccessResponse(result.message, {
        accessToken: result.accessToken,
        user: result.user,
      }, HTTP_STATUS.OK));
  } catch (err) {
    return next(err);
  }
}

async getMe(req:Request,res:Response,next:NextFunction){
  try {
    if(!req.user){
     throw HttpError.Unauthorized("User not authenticated");
    }
    const userId = req.user.id; 
    const result = await this.authService.getUserById(userId)
    return res.status(HTTP_STATUS.OK).json(SuccessResponse('User reloaded',{result},HTTP_STATUS.OK))
  } catch (err) {
     return next(err)
  }
}

async refreshToken(req:Request,res:Response,next:NextFunction){
  try {
    const token = req.cookies?.refreshToken;
    if(!token){
      throw  HttpError.Unauthorized('No refresh token found')
    }
    const accessToken = await this.tokenService.refreshAccessToken(token)
    return res.status(HTTP_STATUS.OK).json(SuccessResponse('AccessToken refreshed',{accessToken},HTTP_STATUS.OK))
  } catch (err) {
    return next(err)
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
      const result = await this.authService.verifyForgotPassword(req.body);
      return res.status(HTTP_STATUS.OK).json(SuccessResponse(result.message, null, HTTP_STATUS.OK));
    } catch (err) {
      return next(err);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.resetPassword(req.body);
      return res.status(HTTP_STATUS.OK).json(SuccessResponse(result.message, null, HTTP_STATUS.OK));
    } catch (err) {
      return next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    clearRefreshTokenCookie(res);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
}
}
