import { Request,Response } from "express";
import AdminService from "./admin.service";



export default class AdminController {
    private adminService = new AdminService()
    
    async AdminLogin(req:Request,res:Response){
        try {
            const result = await this.adminService.AdminPortalLogin(req.body)
            return res.json({success:true,...result})
        } catch (error:any) {
            console.log("error while login admin",error.message)
            return res.status(400).json({
                success:false,
                message:error.message||'Internal server error'
            })
        }
    }
    async GetAllReviewers(req:Request,res:Response){
        try {
            const result = await this.adminService.FetchAllReviewers()
            return res.json({success:true,...result})
        } catch (error:any) {
            console.log('error while fetching interviewers',error)
             return res.status(400).json({
                success:false,
                message:error.message||'Internal server error'
            })
        }
    }

    async ApproveReviewer(req:Request,res:Response){
        try {
            const id = req.params.id
            const result = await this.adminService.ApproveReviewer(id)
            return res.json({success:true,result})
        } catch (error:any) {
             console.log('error while approve reviewer',error)
             return res.status(400).json({
                success:false,
                message:error.message||'Internal server error'
            })
        }
    }

    async DeleteReviewer(req:Request,res:Response){
        try {
            const id =req.params.id
            const result = await this.adminService.DeleteReviewer(id)
            return res.json({success:true,...result})
        } catch (error:any) {
             console.log('error while delete reviewer',error)
             return res.status(400).json({
                success:false,
                message:error.message||'Internal server error'
            })
        }
    }

    
}