import { Schema, model } from "mongoose";
import { IReviewerApplication } from "./reviewerApplication.interface";

const ReviewerApplicationSchema = new Schema<IReviewerApplication>(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    linkedin_url: String,
    portfolio_url: String,

    education: String,
    experience_years: String,
    field: String,

    current_role: String,
    company_name: String,
    Rejected_Reason:String,
    domains: {
      type: [String],
      default: [],
    },

    skills: [
      {
        name: String,
        level: String,
      },
    ],

    motivation: String,
    additional_info: String,

    resume_file: { type: String, required: true },
    education_certificate_file: String,
    experience_certificate_file: String,

    application_status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "reviewer_applications",
  }
);

export default model<IReviewerApplication>(
  "ReviewerApplication",
  ReviewerApplicationSchema
);
