import { Document } from "mongoose";

export interface IUser extends Document {

  name: string;
  email: string;
  password?: string | null;
  googleUser?: boolean;

  role: "student" | "reviewer" | "admin";

 
  bio?: string;
  profile_image_url?: string;
  phone?: string;


  field?: string;

  domains?: string[];

  skills?: {
    name: string;
    level: string; 
  }[];

  experience_years?: number;

  education?: string;
  current_role?: string;
  company_name?: string;

  linkedin_url?: string;
  portfolio_url?: string;

  motivation?: string;
  additional_info?: string;

  resume_file?: string;
  education_certificate_file?: string;
  experience_certificate_file?: string;

  application_status?: "pending" | "approved" | "rejected";

  is_active?: boolean;
  is_online?: boolean;

  last_login_date?: Date;
  last_logout_date?: Date;
  login_ip?: string;

  failed_login_attempts?: number;
  last_failed_attempt?: Date;

 
  streak_count?: number;
  longest_streak?: number;

 
  createdAt?: Date;
  updatedAt?: Date;
}
