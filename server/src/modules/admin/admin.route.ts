import { Router } from "express";
import  AdminController from '../admin/admin.controller'

const adminRoute = Router()
const controller = new AdminController()

adminRoute.post('/login',
    (req,res)=>controller.AdminLogin(req,res)
)
adminRoute.get('/all-reviewers',
    (req,res)=>controller.GetAllReviewers(req,res)
)
adminRoute.delete('/delete-reviewer/:id',
    (req,res)=>controller.DeleteReviewer(req,res)
)
adminRoute.patch('/approve-reviewer/:id',
    (req,res)=>controller.ApproveReviewer(req,res)
)
export default adminRoute