import { Router } from "express";
 
import {requestOtpController,verifyRegisterController,LoginController} from './auth.controller'

const authRoute = Router()

authRoute.post('/register/request-otp',requestOtpController)

authRoute.post('/register/verify',verifyRegisterController)

authRoute.post('/login',LoginController)

export default authRoute