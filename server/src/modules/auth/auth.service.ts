import UserModel from "./auth.model";
import { IUser } from "./auth.interface";
import bcrypt from "bcryptjs";
import OtpService from "./otp.service";
import generateToken from "../../utils/generateToken";


const otpService = new OtpService()

export default class AuthService {
  async requestRegisterOtp(data: Partial<IUser>) {
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
 
}

