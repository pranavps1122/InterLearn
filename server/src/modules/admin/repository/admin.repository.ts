import { BaseRepository } from "@/modules/auth/repository/base.repository";
import { IUser } from "@/modules/auth/types/auth.interface";
import UserModel from '../../auth/models/auth.model'


export class AdminRepository extends BaseRepository<IUser>{
    constructor(){
        super(UserModel)
    }

    async FindByEmail(email:string){
        return this.model.findOne({email}).lean().exec()
    }

    async FindById(id:string){
        return this.model.findById(id)
    }

    async DeleteById(id:string){
        return this.model.findByIdAndDelete(id)
    }

    async ApprovedReviewers(){
        return this.model.find({application_status:'approved'})
    }

    async Students(){
        return this.model.find({role:'student'})
    }


    
   

}