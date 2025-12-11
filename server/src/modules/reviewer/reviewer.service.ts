import reviewerApplication from "./reviewerApplication.model";
import { IReviewerApplication } from "./reviewerApplication.interface";
import UserModel from '../auth/auth.model'
import bcrypt from "bcryptjs";
import generateToken from "../../core/utils/tokens.util";
export default class ReviewerService {
  async BecomeReviewerForm(data: Partial<IReviewerApplication>) {
    const application = await reviewerApplication.create(data);
    return {
      message: "Reviewer application created",
      applicationId: application._id,
    };
  }
  async LoginReviewer(data:{email:string,password:string}){
    const {email,password}=data
    console.log(data)
    if(!email||!password){
      throw new Error('Fill all fields')
    }
    const existing=await reviewerApplication.findOne({email})
    if(!existing){
      throw new Error('Reviewer not found')
    }
    if(existing.application_status=='pending'){
      throw new Error('Application is pending')
    }
    if(existing.application_status=='rejected'){
      throw new Error('Application is rejected...')
    }
    const reviewer = await UserModel.findOne({email})
    console.log(reviewer)
    if(!reviewer){
      throw new Error('Reviewer Not found')
    }
    if(!reviewer.password){
      throw new Error('Password not set for this reviewer')
    }
    const isMatch = await bcrypt.compare(password,reviewer.password)
    console.log('password',isMatch)
    if(!isMatch){
      throw new Error('Password not matching')
    }
    if(reviewer.role!=='reviewer'){
      throw new Error('No reviewer account found')
    }
      const token = generateToken(reviewer._id.toString(),reviewer.role)
        return {message:'Login Successfull',
               token,
               user:{
                id:reviewer._id,
                name:reviewer.name,
                email:reviewer.email,
                role:reviewer.role
               }
    
        }
  }
}
