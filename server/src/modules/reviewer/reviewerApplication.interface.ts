import { Document } from "mongoose";

export interface IReviewerApplication extends Document {
  user_id?: string;

  full_name: string;
  email: string;
  phone: string;

  linkedin_url?: string;
  portfolio_url?: string;

  education: string;
  experience_years: string;
  field: string;

  current_role: string;
  company_name?: string;
  Rejected_Reason:string
  domains: string[];
  skills: {
    name: string;
    level: string;
  }[];

  motivation: string;
  additional_info?: string;

  resume_file: string;
  education_certificate_file?: string;
  experience_certificate_file?: string;
  password:string,
  application_status: "pending" | "approved" | "rejected";

  created_at?: Date;
}
