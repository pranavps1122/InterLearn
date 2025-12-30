import { BaseRepository } from "@/modules/auth/repository/base.repository";
import { IReviewerApplication } from "@/modules/reviewer/reviewerApplication.interface";
import reviewerApplicationModel from "@/modules/reviewer/reviewerApplication.model";


export class ReviewerApplicationRepository extends BaseRepository<IReviewerApplication>{
    constructor(){
        super(reviewerApplicationModel)
    }
    async PendingApplication(){
        return this.model.find({application_status:'pending'})
    }
    async DeleteApplication(id:string){
        return this.model.findByIdAndDelete(id)
    }
  
}