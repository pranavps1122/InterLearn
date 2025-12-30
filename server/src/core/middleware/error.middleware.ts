import { Request, Response, NextFunction } from "express";
import { isHttpError } from "@/core"

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("🔥 Error:", err);

  if (isHttpError(err)) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      details: err.details ?? undefined,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}