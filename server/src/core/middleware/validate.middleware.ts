import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodError } from "zod";
import { HttpError } from "@/core";

export const validate =
  (schema: ZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          HttpError.BadRequest("Validation failed", error.flatten().fieldErrors)
        );
      }

      return next(error);
    }
  };
