import reviewerApplicationModel from '../reviewer/reviewerApplication.model';
import {transporter} from '../../config/email.config'
import {interviewerApprovalEmailTemplate} from '../../templates/emailApproveTemplate'
import {generateAccessToken,generateRefreshToken} from '@/core/utils'
import UserModel from '../../modules/auth/auth.model'
import { UserRepository } from "../auth/repository/user.repository";
import bcrypt from "bcryptjs";

const adminRepo = new UserRepository()

export default class AdminService {

    async AdminPortalLogin(data:{email:string,password:string}){
        const {email,password}=data
        console.log(data)
        if(!email||!password){
            throw new Error("Fill all fields")
        }
        const admin = await adminRepo.findAdminByEmail(email)
        console.log(admin)
        if(!admin){
            throw new Error('Admin not exist')
        }
        if(admin.role!=='admin'){
            throw new Error('This is not admin')
        }
        if(!admin.password){
            throw new Error('Admin have no password')
        }
        const isMatch = await bcrypt.compare(password,admin.password)
        if(!isMatch){
            throw new Error('Password not matching')
        }
        const accessToken = generateAccessToken({
            id:admin._id.toString(),
            role:admin.role
        })
        const refreshToken = generateRefreshToken({
            id:admin._id.toString(),
            role:admin.role
        })
        return {
            message:"Login Successful",
            accessToken,
            refreshToken,
            user:{
               id:admin._id,
               email:admin.email,
               name:admin.name,
               role:admin.role

            }
        }
    }

    async FetchAllReviewers(){
        const reviewers = await reviewerApplicationModel.find()
        console.log(reviewers)
        return {
            message:'Get all reviewers',
            data:reviewers
        }

    }
    
    async DeleteReviewer(id:any){
        console.log('reviewer',id)
        if(!id){
            throw new Error('id not provided')
        }
        await reviewerApplicationModel.findByIdAndDelete(id)
        return {
            message:'Deleted successfuly'
        }
    }

    async ApproveReviewer(id:any){
        if(!id){
            throw new Error('id not provied')
        }
        const reviewer = await reviewerApplicationModel.findById(id)

        if(!reviewer){
            throw new Error('reviewer not found')
        }

        console.log('reviewer detials',reviewer)
       
        const {
        full_name,
        email,
        phone,
        linkedin_url,
        portfolio_url,
        education,
        experience_years,
        field,
        current_role,
        company_name,
        domains,
        skills,
        motivation,
        additional_info,
        resume_file,
        education_certificate_file,
        experience_certificate_file,
        application_status,
        } = reviewer;

        const formattedSkills = skills.map((s: any) => `${s.name} (${s.level})`);


        await reviewerApplicationModel.findByIdAndUpdate(id, {
            application_status: "approved",
        });

        function generateTempPassword(length = 10) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let pass = "";
        for (let i = 0; i < length; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return pass;
        }

        const tempPassword = generateTempPassword();
        console.log('temp password',tempPassword)
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        await UserModel.create({
        name:full_name,
        email,
        password:hashedPassword,
        role:'reviewer',
        application_status:'approved',
        phone,
        linkedin_url,
        portfolio_url,
        education,
        experience_years,
        field,
        current_role,
        company_name,
        domains,
        skills:formattedSkills,
        motivation,
        additional_info,
        resume_file,
        education_certificate_file,
        experience_certificate_file,
        })

          const emailHtml = interviewerApprovalEmailTemplate(
                full_name,
                field,
                tempPassword,
                "https://interlearn.com/dashboard"
            );

            const mailOptions = {
                from: `"InterLearn" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "🎉 Congratulations! Your InterLearn Account Has Been Approved",
                html: emailHtml,
                text: `Hello ${full_name},

            Congratulations! Your InterLearn interviewer application has been approved.

            Your expertise in ${field} is exactly what we need.
            
            This is your temporary password ${tempPassword} please change immediatly
            
            Log in to your dashboard: https://interlearn.com/dashboard

            Best regards,
            InterLearn Team`,
            };

            await transporter.sendMail(mailOptions);

            return { success: true, message: "Reviewer approved and email sent." };
    }
}