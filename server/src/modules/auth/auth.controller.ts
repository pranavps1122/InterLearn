import { Request, Response } from "express";
import AuthService from "./auth.service";

export default class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async requestOtp(req: Request, res: Response): Promise<any> {
    try {
      const result = await this.authService.requestRegisterOtp(req.body);
      return res.json({ success: true, ...result });
    } catch (error: any) {
      console.log("Error while sending OTP:", error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async verifyRegister(req: Request, res: Response): Promise<any> {
    try {
      const result = await this.authService.verifyAndRegister(req.body);
      return res.json({ success: true, ...result });
    } catch (error: any) {
      console.log("Error while registering:", error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  
  async login(req: Request, res: Response): Promise<any> {
    try {
      const result = await this.authService.UserLogin(req.body);
      return res.json({ success: true, ...result });
    } catch (error: any) {
      console.log("Error while login:", error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
