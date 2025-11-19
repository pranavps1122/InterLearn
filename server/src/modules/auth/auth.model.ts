import { Schema, model } from "mongoose";
import { IUser } from "./auth.interface";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

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

    last_login_date: Date,

    last_logout_date: Date,

    login_ip: String,

    failed_login_attempts: { type: Number, default: 0 },

    last_failed_attempt: Date,
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
