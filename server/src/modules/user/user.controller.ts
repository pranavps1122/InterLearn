import { Request, Response } from "express";
import UserService from "./user.service";

export default class UserController {
  private userService = new UserService();

  async profile(req: Request, res: Response) {
    try {
      const result = await this.userService.UserProfile(req.user!.id);

      return res.status(200).json({
        success: true,
        user: result,
      });
    } catch (error: any) {
      console.log("error while getting profile", error);
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
}
