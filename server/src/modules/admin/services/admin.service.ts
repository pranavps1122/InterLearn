import { IAdminServices } from "@/core/interfaces/admin/admin.service.interface";
import { ReviewerManagementService } from "./reviewer-management.service";
import { UserManagementService } from "./user-management.service";

export class AdminService implements IAdminServices{
    constructor(
        private reviewerService : ReviewerManagementService,
        private userService : UserManagementService
    ){}

     // reviewer section
  getPendingReviewers() {
    return this.reviewerService.getPendingReviewers();
  }

  getApprovedReviewers() {
    return this.reviewerService.getApprovedReviewers();
  }

  approveReviewer(id: string) {
    return this.reviewerService.approveReviewer(id);
  }

  rejectReviewer(id: string, note: string) {
    return this.reviewerService.rejectReviewer(id, note);
  }

  blockReviewer(id: string) {
    return this.reviewerService.blockReviewer(id);
  }

  unblockReviewer(id: string) {
    return this.reviewerService.unblockReviewer(id);
  }

  deleteReviewer(id:string){
    return this.reviewerService.deleteReviewer(id)
  }

  // user section
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  blockUser(id: string) {
    return this.userService.blockUser(id);
  }

  unblockUser(id: string) {
    return this.userService.unblockUser(id);
  }

  deleteUser(id: string) {
    return this.userService.deleteUser(id);
  }

}

