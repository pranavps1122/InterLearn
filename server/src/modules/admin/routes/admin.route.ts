import { Router } from "express";
import  {adminController} from '../../admin/admin.module'
import { authorize, protect } from "@/core/middleware/auth.middleware";
import { ROLE } from "@/core/constants/roles";
import { asyncHandler } from "@/core/middleware/async-handler.middleware";
import { validate } from "@/core/middleware/validate.middleware";
import { rejectReviewerSchema } from "../validation/reviewer.schema";
const adminRoute = Router()



adminRoute.use(protect,authorize([ROLE.ADMIN]))

adminRoute.get('/pending-reviewers',
    asyncHandler(adminController.getPendingReviewer.bind(adminController))
)
adminRoute.get('/approved-reviewers',
    asyncHandler(adminController.getApprovedReviewers.bind(adminController))
)
adminRoute.get('/all-users',
    asyncHandler(adminController.getAllUsers.bind(adminController))
)
adminRoute.patch('/block-user/:id',
   asyncHandler(adminController.blockUser.bind(adminController))
)
adminRoute.patch('/unblock-user/:id',
    asyncHandler(adminController.unblockUser.bind(adminController))
)
adminRoute.delete('/delete-user/:id',
    asyncHandler(adminController.deleteUser.bind(adminController))
)
adminRoute.delete('/delete-reviewer/:id',
    asyncHandler(adminController.deleteReviewer.bind(adminController))
)
adminRoute.patch('/approve-reviewer/:id',
    asyncHandler(adminController.approveReviewer.bind(adminController))
)
adminRoute.patch('/reject-reviewer/:id',
    validate(rejectReviewerSchema),
    asyncHandler(adminController.rejectReviewer.bind(adminController))
)
adminRoute.patch('/block-reviewer/:id',
    asyncHandler(adminController.blockReviewer.bind(adminController))
)
adminRoute.patch('/unblock-reviewer/:id',
   asyncHandler(adminController.unblockReviewer.bind(adminController))
)
export default adminRoute