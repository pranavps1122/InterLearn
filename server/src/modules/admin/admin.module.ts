import AdminController from "./controllers/admin.controller";
import { AdminService } from "./services/admin.service";
import { AdminRepository } from "./repository/admin.repository";
import { ReviewerApplicationRepository } from "./repository/application.repository";
import { UserManagementService } from "./services/user-management.service";
import { ReviewerManagementService } from "./services/reviewer-management.service";


const applicationRepository = new ReviewerApplicationRepository()
const adminRepository = new AdminRepository()

const reviewerService = new ReviewerManagementService(
    applicationRepository,
    adminRepository
)

const userService = new UserManagementService(
    adminRepository
)

const adminService = new AdminService(
    reviewerService,
    userService
)

const adminController = new AdminController(
    adminService
)


export {adminController}
