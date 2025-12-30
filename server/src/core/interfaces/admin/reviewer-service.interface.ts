import { IUser } from "@/modules/auth/types/auth.interface";
import { IReviewerApplication } from "@/modules/reviewer/reviewerApplication.interface"

export interface IReviewerAdminService {
    
  getPendingReviewers(): Promise<IReviewerApplication[]>;

  getApprovedReviewers(): Promise<IUser[]>;

  approveReviewer(userId: string): Promise<IUser>;

  rejectReviewer(userId: string, reason?: string): Promise<boolean>;

  deleteReviewer(userId: string, reason?: string): Promise<boolean>;

  blockReviewer(userId: string, reason?: string): Promise<boolean>;

  unblockReviewer(userId: string, reason?: string): Promise<boolean>;
}
