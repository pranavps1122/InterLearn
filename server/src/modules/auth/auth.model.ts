import { Schema, model } from "mongoose";
import { IUser } from "./auth.interface";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    googleUser: { type: Boolean, default: false },   

      password: {
      type: String,
      required: function (this: any): boolean {
        return !this.googleUser;  
      },
      default: null,
    },


    role: {
      type: String,
      enum: ["student", "reviewer", "admin"],
      default: "student",
    },

    bio: String,
    domains: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    profile_image_url: String,
    experience_years: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
    is_online: { type: Boolean, default: false },
    streak_count: { type: Number, default: 0 },
    longest_streak: { type: Number, default: 0 },
    application_status: {
      type: String,
      enum: ["pending", "approved", "rejected"]
    },
    last_login_date: Date,
    last_logout_date: Date,
    login_ip: String,
    failed_login_attempts: { type: Number, default: 0 },
    last_failed_attempt: Date,
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
export type { IUser }; 
