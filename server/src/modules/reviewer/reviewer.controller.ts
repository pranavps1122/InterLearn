import { Request,Response } from "express";
import ReviewerService from "./reviewer.service";

export default class ReviewerController {
    private reviewerService:ReviewerService

    constructor(){
        this.reviewerService = new ReviewerService()
    }
async BecomeReviewerForm(req:Request, res:Response) {
  try {
    const data = req.body;


        if (data.skills) {
        if (Array.isArray(data.skills)) {
           
            data.skills = data.skills.map((skill: any) => JSON.parse(skill));
        } else {
            
            data.skills = [JSON.parse(data.skills)];
        }
        }

    if (typeof data.domains === "string") {
      data.domains = [data.domains];
    }

    
    const files = req.files as any;

    data.resume_file = files?.resume_file?.[0]?.path || null;
    data.education_certificate_file = files?.education_certificate_file?.[0]?.path || null;
    data.experience_certificate_file = files?.experience_certificate_file?.[0]?.path || null;

    const result = await this.reviewerService.BecomeReviewerForm(data);

    return res.json({ success: true, result });
  } catch (error: any) {
    console.log("error while submit form", error);
    return res.status(400).json({ success: false, message: error.message });
  }
}


}