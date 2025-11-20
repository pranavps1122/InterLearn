import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "student" | "reviewer" | "admin";
  bio?: string;
  domains?: string[];     
  skills?: string[];      
  profile_image_url?: string;
  experience_years?: number;
  is_active?: boolean;
  is_online?: boolean;
  streak_count?: number;
  longest_streak?: number;
  last_login_date?: Date;
  last_logout_date?: Date;
  login_ip?: string;
  application_status:'pending'|'approved'|'rejected'
  failed_login_attempts?: number;
  last_failed_attempt?: Date;
}
