import { Response } from "express";
import { env } from "../config/env.config";
import { HttpError } from "@/core/errors/httpError";

export function setRefreshTokenCookie(res: Response, token: string) {
  if (!token) {
    throw HttpError.BadRequest("Refresh token missing");
  }

  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: false,     
    sameSite: "lax",  
    path: "/",                  
    maxAge: env.refreshTokenMaxAge,
  });
}


export function clearRefreshTokenCookie(res: Response) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",        
  });
}