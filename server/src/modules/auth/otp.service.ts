import otpModel from "./otp.model";
import {transporter} from '../../config/email.config'
import {otpEmailTemplate} from '../../templates/emailOtpTemplate'

export default class OtpService {
    async generateOtp(email:string){
        const otp = Math.floor(100000+Math.random()*90000).toString()

        await otpModel.create({
            email,
            otp,
            expiresAt:new Date(Date.now()+5*60*1000)
        })
        return otp
    }
    async sendOtp(email:string,otp:string):Promise<void>{
      const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "InterLearn Account Verification - OTP Code",
      text: `Your OTP code is: ${otp}`,
      html: otpEmailTemplate(otp),
    };

        await transporter.sendMail(mailOptions)
    }
    async verifyOtp(email:string,otp:string){
        const record = await otpModel.findOne({email,otp})
        if(!record){
            throw new Error('invalid otp')
        }
        if(record.expiresAt<new Date()){
            throw new Error('Otp Expired')
        }
        await otpModel.deleteMany({email})
        return true
    }
}