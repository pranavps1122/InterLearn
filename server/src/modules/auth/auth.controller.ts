import { Request,Response } from "express";
import AuthService from "./auth.service";

const authService = new AuthService()


export const requestOtpController = async (req:Request,res:Response)=>{
    try {
        const result = await authService.requestRegisterOtp(req.body)
        res.json({success:true,...result})
    } catch (error:any) {
        res.status(400).json({success:false,message:error.message})
        console.log('error while send otp',error)
    }
}

export const verifyRegisterController = async(req:Request,res:Response)=>{
    try {
       const result = await authService.verifyAndRegister(req.body)
       res.json({success:true,...result}) 
    } catch (error:any) {
          res.status(400).json({success:false,message:error.message})
          console.log('error while register',error)
    }
}

export const LoginController = async (req:Request,res:Response)=>{
    try {
        const result = await authService.UserLogin(req.body)
        res.json({success:true,...result})
    } catch (error:any) {
         res.status(400).json({success:false,message:error.message})
         console.log('error while login',error)
    }
}



