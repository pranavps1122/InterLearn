import { Request,Response,NextFunction } from "express";
import { IAdminServices } from "@/core/interfaces/admin/admin.service.interface";

import { SuccessResponse } from "@/core/utils/response";
import { HTTP_STATUS } from "@/core/constants/httpStatus";
import { success } from "zod";


export default class AdminController  {
    
    constructor(
        private adminService : IAdminServices
    ){}

    async getPendingReviewer(req:Request,res:Response){
      
            const result = await this.adminService.getPendingReviewers()
            return res.json({success:true,result})
    
    }

    async getApprovedReviewers(req:Request,res:Response){
        
            const result = await this.adminService.getApprovedReviewers()
            console.log('result in backend',result)
            return res.json({success:true,result})
  
    }




    async approveReviewer(req:Request,res:Response){
      
            const id = req.params.id
            const result = await this.adminService.approveReviewer(id)
            return res.json({success:true,result})
   
    }

    async rejectReviewer(req:Request,res:Response){
        
            const id = req.params.id
            const {rejection_note}=req.body
            const result = await this.adminService.rejectReviewer(id,rejection_note)
            return res.json({success:true,result})
     
    }

    async deleteReviewer(req:Request,res:Response){
     
            const id =req.params.id
            const result = await this.adminService.deleteReviewer(id)
            return res.json({success:true,result})
        
    }

    async blockReviewer(req:Request,res:Response){
     
            const id = req.params.id
            const result = await this.adminService.blockReviewer(id)
            return res.json({success:true,result})
        
    }

    async unblockReviewer(req:Request,res:Response){
        
            const id = req.params.id
            const result = await this.adminService.unblockReviewer(id)
            return res.json({success:true,result})
        
    }

    async getAllUsers(req:Request,res:Response){
       
            const result = await this.adminService.getAllUsers()
            return res.json({success:true,result})
        
    }

    async blockUser(req:Request,res:Response){
       
            const userId = req.params.id
            const result = await this.adminService.blockUser(userId)
            return res.json({success:true,result})
    
    }

    async unblockUser(req:Request,res:Response){
        
            const userId = req.params.id
            const result = await this.adminService.unblockUser(userId)
            return res.json({success:true,result})
     
    }

     async deleteUser(req:Request,res:Response){
       
            const userId = req.params.id
            const result = await this.adminService.deleteUser(userId)
            return res.json({success:true,result})
   
    }
    
    
}