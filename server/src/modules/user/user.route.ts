import { Router } from "express";
import UserController from "./user.controller";
import { protect } from "../../core/middleware/auth.middleware";

const userRoute = Router();
const controller = new UserController();

userRoute.get("/profile", protect, (req, res) => controller.profile(req, res));

export default userRoute;
