import { Router } from "express";
import { upload } from "../../core/middleware/multer";
import ReviewerController from "./reviewer.controller";

const reviewerRoute = Router();
const Reviewer = new ReviewerController();

reviewerRoute.post(
  "/submit",
  upload.fields([
    { name: "resume_file", maxCount: 1 },
    { name: "education_certificate_file", maxCount: 1 },
    { name: "experience_certificate_file", maxCount: 1 },
  ]),
  (req, res) => Reviewer.BecomeReviewerForm(req, res)
);

reviewerRoute.post('/login',
  (req,res,next)=>Reviewer.Login(req,res,next)
)

export default reviewerRoute;
