import { Router } from "express";
import {UserProfileController} from './user.controller'
import { protect } from "../../middleware/auth.middleware";
const userRoute = Router()

userRoute.get('/profile',protect,UserProfileController)



export default userRoute