import { Request, Response ,NextFunction} from "express";
import ReviewerService from "./reviewer.service";
import { uploadToCloudinary } from "../../core/middleware/cloudinaryUpload";
import reviewerApplicationModel from "../reviewer/reviewerApplication.model";
import { compressImage } from "../../core/utils/compressImage";
import { SuccessResponse } from "@/core/utils/response";
import { HTTP_STATUS } from "@/core/constants/httpStatus";

export default class ReviewerController {
  private reviewerService: ReviewerService;

  constructor() {
    this.reviewerService = new ReviewerService();
  }

  private safeParseJSON(value: any) {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  async BecomeReviewerForm(req: Request, res: Response) {
    try {
      const data = req.body;
      const files = req.files as any;

      data.domains = data.domains
        ? Array.isArray(data.domains)
          ? data.domains
          : [data.domains]
        : [];

      if (data.skills) {
        const rawSkills = Array.isArray(data.skills)
          ? data.skills
          : [data.skills];

        data.skills = rawSkills
          .map((item: any) => this.safeParseJSON(item))
          .filter((s: any) => s && s.name && s.level);
      } else {
        data.skills = [];
      }

      const email = data.email?.trim().toLowerCase();
      const alreadySubmitted = await reviewerApplicationModel.findOne({ email });

      if (alreadySubmitted)
        return res.status(400).json({ success: false, message: "Application already submitted" });

      if (!data.full_name || data.full_name.trim().length < 3)
        return res.status(400).json({ success: false, message: "Full name must be at least 3 characters long" });

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email || !emailRegex.test(data.email))
        return res.status(400).json({ success: false, message: "Invalid email format" });

      if (!/^\d{10}$/.test(data.phone))
        return res.status(400).json({ success: false, message: "Phone number must be 10 digits" });

      if (!data.education)
        return res.status(400).json({ success: false, message: "Enter your qualification" });

      if (!data.experience_years)
        return res.status(400).json({ success: false, message: "Enter your experience" });

      if (!data.field)
        return res.status(400).json({ success: false, message: "Enter your field" });

      if (!data.domains.length)
        return res.status(400).json({ success: false, message: "Select at least one domain" });

      if (!data.skills.length)
        return res.status(400).json({ success: false, message: "Select at least one skill" });

      if (!files?.resume_file)
        return res.status(400).json({ success: false, message: "Resume file is required" });

      if (!files?.education_certificate_file)
        return res.status(400).json({ success: false, message: "Education file is required" });

      if (!files?.experience_certificate_file)
        return res.status(400).json({ success: false, message: "Experience file is required" });

      let resumeBuffer = files.resume_file[0].buffer;
      let eduBuffer = files.education_certificate_file[0].buffer;
      let expBuffer = files.experience_certificate_file[0].buffer;

      const isPDF = (buff: Buffer) =>
        buff.slice(0, 4).toString() === "%PDF";

      if (resumeBuffer && !isPDF(resumeBuffer))
        resumeBuffer = await compressImage(resumeBuffer);

      if (eduBuffer && !isPDF(eduBuffer))
        eduBuffer = await compressImage(eduBuffer);

      if (expBuffer && !isPDF(expBuffer))
        expBuffer = await compressImage(expBuffer);

      const [resumeUpload, eduUpload, expUpload] = await Promise.all([
        resumeBuffer ? uploadToCloudinary(resumeBuffer, "InterLearn") : null,
        eduBuffer ? uploadToCloudinary(eduBuffer, "InterLearn") : null,
        expBuffer ? uploadToCloudinary(expBuffer, "InterLearn") : null,
      ]);

      data.resume_file = resumeUpload?.secure_url || null;
      data.education_certificate_file = eduUpload?.secure_url || null;
      data.experience_certificate_file = expUpload?.secure_url || null;
      
      const result = await this.reviewerService.BecomeReviewerForm(data);

      return res.status(200).json({ success: true, result });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async Login (req:Request,res:Response,next: NextFunction){
    try {
      const result = await this.reviewerService.LoginReviewer(req.body)

     const isProduction = process.env.NODE_ENV === "production";

     res.cookie('refreshToken',result.refreshToken,{
        httpOnly:true,
        secure:isProduction,
        sameSite: isProduction ? "strict" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
     })

     const {refreshToken,...safeResult} = result

      return res.status(HTTP_STATUS.OK)
      .json(
        SuccessResponse(safeResult.message,{
          accessToken:safeResult.accessToken,
          user:safeResult.user
        },HTTP_STATUS.OK)
      )
    } catch (err) {
      return next(err);
    }
  }
}
