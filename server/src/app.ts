
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/routes/auth.routes";
import userRoutes from "./modules/user/user.route";
import reviewerRoutes from "./modules/reviewer/reviewer.route";
import adminRoutes from "./modules/admin/routes/admin.route";
import { errorMiddleware } from "./core/middleware/error.middleware";

dotenv.config();

const app = express();

const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:5173"; 


app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "OK", message: "Server Running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/reviewer", reviewerRoutes);
app.use("/api/admin", adminRoutes);




app.use(errorMiddleware)


export default app;
