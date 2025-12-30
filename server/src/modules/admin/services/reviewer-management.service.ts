    import { AdminRepository } from "../repository/admin.repository";
    import { ReviewerApplicationRepository } from "../repository/application.repository";
    import bcrypt from "bcryptjs";
    import { generateTempPassword } from "@/core/utils/password.util";
    import { interviewerApprovalEmailTemplate } from "@/templates/emailApproveTemplate";
    import { emailService } from "@/core/providers/email.service";

    export class ReviewerManagementService {
        constructor(
            private applicationRepo: ReviewerApplicationRepository,
            private adminRepo : AdminRepository
        ){}



    /*Get PendingReviewers */
            async getPendingReviewers(){
            return this.applicationRepo.PendingApplication()
        }

    /* Get ApprovedReviewers */
            async getApprovedReviewers(){
            return this.adminRepo.ApprovedReviewers()
        }

        
    /* Get Apporve Reviewer */

        async approveReviewer(id: string) {
                try {
                    if (!id) {
                    throw new Error("Reviewer id not provided");
                    }
        
                    const reviewer = await this.applicationRepo.findById(id)
        
                    if (!reviewer) {
                    throw new Error("Reviewer not found");
                    }
        
                    const ReviewerEmail  = reviewer.email
                    const existingUser = await this.adminRepo.FindByEmail(ReviewerEmail)
                    if (existingUser) {
                    throw new Error("User already exists with this email");
                    }
                    
                    await this.applicationRepo.update(id,{
                        application_status:"approved"
                    })
        
                
        
                    const tempPassword = generateTempPassword();
                    const hashedPassword = await bcrypt.hash(tempPassword, 10);
        
                    
        
                    const user = await this.adminRepo.create ({
                    name: reviewer.full_name,
                    email: reviewer.email,
                    password: hashedPassword,
                    role: "reviewer",
                    application_status: "approved",
        
                    phone: reviewer.phone,
                    field: reviewer.field,
        
                    domains: reviewer.domains || [],
        
                    skills: reviewer.skills || [], 
        
                    experience_years: Number(reviewer.experience_years || 0),
        
                    education: reviewer.education,
                    current_role: reviewer.current_role,
                    company_name: reviewer.company_name,
        
                    linkedin_url: reviewer.linkedin_url,
                    portfolio_url: reviewer.portfolio_url,
        
                    motivation: reviewer.motivation,
                    additional_info: reviewer.additional_info,
        
                    resume_file: reviewer.resume_file,
                    education_certificate_file: reviewer.education_certificate_file,
                    experience_certificate_file: reviewer.experience_certificate_file,
                    });
        
                await emailService.sendReviewerApprovalEmail({
                    to: reviewer.email,
                    name: reviewer.full_name,
                    field: reviewer.field,
                    tempPassword,
                    });
                    await this.applicationRepo.delete(id)
                    return user
                } catch (error: any) {
                    console.error("Error while approving reviewer:", error);
                    throw new Error(error.message || "Reviewer approval failed");
                }
                }
        

    /* Reject Reviewer*/

    async rejectReviewer(id: string, rejection_note: string) {
            try {
                if (!id) {
                throw new Error("Reviewer id not provided");
                }

                if (!rejection_note || rejection_note.trim().length < 10) {
                throw new Error("Rejection reason is required");
                }

                const reviewer = await this.applicationRepo.update(
                    id,
                    {
                        application_status:'rejected',
                        Rejected_Reason:rejection_note
                    }
                )


                if (!reviewer) {
                throw new Error("Reviewer not found");
                }

                return true

            } catch (error: any) {
                console.error("Error rejecting reviewer:", error);
                throw new Error(error.message || "Failed to reject reviewer");
            }
            }

    /* Block Reviewer */

    async blockReviewer(id:any){
            try {
            const reviewerId = id
            console.log('reviewerid',id)
            if(!reviewerId){
                throw new Error('Reviewer id not provided')
            } 
                const reviewer = await this.adminRepo.update(id,{
                    is_active:false
                })
                console.log(reviewer)
                if(!reviewer){
                    throw new Error('reviewer not found')
                }

                return true

            } catch (error) {
                console.log('error while blocking reviewer',error)
                throw new Error('errror while blocking reviewer')
            }
        }

/* Unblock Reviewer */

   async unblockReviewer(id:any){
        try {
          const reviewerId = id
           console.log('reviewerid',id)
           if(!reviewerId){
            throw new Error('Reviewer id not provided')
           } 
           const reviewer = await this.adminRepo.update(
            id,
            {
                is_active:true
            }
           )
           console.log('reviewer',reviewer)
           return true
        } catch (error) {
            console.log('error while blocking reviewer',error)
            throw new Error('errror while blocking reviewer')
        }
    }

    async deleteReviewer(id:any){
        try {
            const reviewerId = id
            if(!reviewerId){
                throw new Error('Reviewer id not provided')
            }
            await this.adminRepo.DeleteById(id)
            return true
        } catch (error) {
            console.log('error while blocking reviewer',error)
            throw new Error('errror while blocking reviewer')
        }
    }
        
    }