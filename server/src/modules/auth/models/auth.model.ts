import { Schema, model } from "mongoose";
import { IUser } from "../types/auth.interface";

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    level: { type: String, required: true }, 
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
  
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    googleUser: { type: Boolean, default: false },

    password: {
      type: String,
      required: function (this: any) {
        return !this.googleUser;
      },
      default: null,
    },

    role: {
      type: String,
      enum: ["student", "reviewer", "admin"],
      default: "student",
    },


    bio: { type: String, default: "" },
    profile_image_url: { type: String, default: "" },
    phone: { type: String },

 
    field: { type: String }, 

    domains: {
      type: [String],
      default: [],
    },

    skills: {
      type: [SkillSchema],
      default: [],
    },

    experience_years: {
      type: Number,
      default: 0,
    },

    education: { type: String },
    current_role: { type: String },
    company_name: { type: String },

    linkedin_url: { type: String },
    portfolio_url: { type: String },

    motivation: { type: String },
    additional_info: { type: String },

    resume_file: { type: String },
    education_certificate_file: { type: String },
    experience_certificate_file: { type: String },

    
    application_status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    is_active: { type: Boolean, default: true },
    is_online: { type: Boolean, default: false },

    last_login_date: { type: Date },
    last_logout_date: { type: Date },
    login_ip: { type: String },

    failed_login_attempts: { type: Number, default: 0 },
    last_failed_attempt: { type: Date },

    streak_count: { type: Number, default: 0 },
    longest_streak: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", UserSchema);
