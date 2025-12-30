import { Schema, model } from "mongoose";

const refreshTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, index: true },
    token: { type: String, required: true, unique: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

export const RefreshTokenModel = model(
  "RefreshToken",
  refreshTokenSchema
);