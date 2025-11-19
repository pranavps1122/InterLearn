import { Request,Response } from "express";
import UserService from './user.service'

const userService = new UserService()

export const UserProfileController = async (req:Request,res:Response)=>{
    try {
        const result = await userService.UserProfile(req.user!.id)

        return res.status(200).json({
            success:true,
            user:result
        })
    } catch (error:any) {
        console.log('error while getting profile',error)
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}