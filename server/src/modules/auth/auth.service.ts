import UserModel from "./auth.model";
import {RegisterDto} from './auth.dto'
import bcrypt from "bcryptjs";
import OtpService from "./otp.service";
import generateToken from "../../utils/generateToken";
import otpModel from "./otp.model";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const otpService = new OtpService()

export default class AuthService {
  async requestRegisterOtp(data: Partial<RegisterDto>) {
    const { name, email, password,confirmPassword} = data;

    if(!name||!email||!password||!confirmPassword){
      throw new Error('all fields are required')
    }
    const existing = await UserModel.findOne({email})
    if(existing){
      throw new Error('user already exist')
    }
    

    const otp = await otpService.generateOtp(email)

    await otpService.sendOtp(email,otp)
    return{message:'Otp sent to your email'}
  }

    async ResendOtp(data: Partial<RegisterDto>) {
      const { email } = data;

      if (!email) {
        throw new Error("Email is required");
      }
      await otpModel.deleteMany({email})
      const existing = await UserModel.findOne({ email });
      if (existing) {
        throw new Error("User already exists");
      }

      const otp = await otpService.generateOtp(email);

      await otpService.sendOtp(email, otp);

      return { message: "OTP resent successfully" };
    }

  async verifyAndRegister(data:{
    name:string,
    email:string,
    password:string,
    otp:string
  }){
    const {name,email,password,otp}=data

    await otpService.verifyOtp(email,otp)
    const hashed = await bcrypt.hash(password,10)
    const user = await UserModel.create({
      name,
      email,
      password:hashed
    })
    return {
      message:'Registration successful',
      id:user._id.toString(),
      name:user.name,
      email:user.email
    }
  }
  
  async UserLogin(data:{
    email:string,
    password:string
  }){
    const {email,password}=data
    if(!email||!password){
      throw new Error('All fileds are required')
    }
    const user = await UserModel.findOne({email})

    if(!user){
      throw new Error('User not exists')
    }
    if(user.googleUser){
      throw new Error('Please Login With Google')
    }
    if(!user.password){
      throw new Error('Login With Google')
    }
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
      throw new Error('Incorrect Password')
    }

    const token = generateToken(user._id.toString(),user.role)
    return {message:'Login Successfull',
           token,
           user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
           }

    }
    
  }
     
  async GoogleAuthLogin(data: any) {
  
        const idToken = data.credential;

        if (!idToken) {
          throw new Error("Google token missing");
        }

        const ticket = await client.verifyIdToken({
          idToken,
          audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

         

        if (!payload) throw new Error("Invalid Google Token");

        const { email, name, picture ,aud} = payload;

         console.log("BACKEND ENV CLIENT ID =>", process.env.GOOGLE_CLIENT_ID);
          console.log("TOKEN AUDIENCE =>", payload.aud);
        if (!email) throw new Error("Google email missing");

        let user = await UserModel.findOne({ email });

        if (!user) {
          user = await UserModel.create({
            email,
            name,
            googleUser:true,
            password: null,
           
          });
        }

        const token = generateToken(user._id.toString(), user.role);

        return {
          message: "Google Login Successful",
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
    
          }
        };
      }

 
}

