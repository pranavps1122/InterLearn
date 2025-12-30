import { Schema,model } from "mongoose";


interface IOtp{
    email:string,
    otp:string
    expiresAt:Date
}

const OtpSchema = new Schema<IOtp>({
      email: { type: String, required: true },
      otp: { type: String, required: true },
      expiresAt: { type: Date, required: true,index:{expires:600} },
      
})

export default model<IOtp>("Otp", OtpSchema);