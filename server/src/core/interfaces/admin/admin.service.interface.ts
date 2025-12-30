import { IUserAdminService } from "../admin/user-service.interface"
import {IReviewerAdminService} from "../admin/reviewer-service.interface"

export interface IAdminServices extends 
IUserAdminService,
IReviewerAdminService
{
    
}