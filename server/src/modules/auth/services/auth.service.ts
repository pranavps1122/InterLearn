import { RegisterDto } from "../dtos/auth.dto";
import bcrypt from "bcryptjs";
import OtpService from "../services/otp.service";
import { OAuth2Client } from "google-auth-library";
import { HttpError } from "@/core";
import { UserRepository } from "../repository/user.repository";
import { mapUserToDto } from "../mappers/user.mapper";
import {ROLE} from '@/core/constants/roles'
import { IAuthTokenService } from "@/core/interfaces/auth/auth-token.interface";
import { RefreshTokenRepository } from "../repository/refresh-token.repo";

export default class AuthService {
  constructor(
    private userRepo :UserRepository,
    private otpService : OtpService,
    private googleClient : OAuth2Client,
    private tokenService : IAuthTokenService,
    private refreshTokenRepo: RefreshTokenRepository
    
  ){}
  async requestRegisterOtp(data: Partial<RegisterDto>) {
    const { name, email, password, confirmPassword } = data;
   

    if (!name || !email || !password || !confirmPassword) {
      throw HttpError.BadRequest("All fields are required");
    }
    if (password !== confirmPassword) {
      throw HttpError.BadRequest("Passwords do not match");
    }

    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
     
      throw HttpError.Conflict("User already exists");
    }

    const otp = await this.otpService.generateOtp(email);
    await this.otpService.sendOtp(email, otp);

    return { message: "OTP sent to your email" };
  }

  async resendOtp(data: Partial<{ email: string }>) {
    const { email } = data;
    if (!email) {
      throw HttpError.BadRequest("Email is required");
    }

    await this.otpService.deleteOtp(email)

    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw HttpError.Conflict("User already exists");
    }

    const otp = await this.otpService.generateOtp(email);
    await this.otpService.sendOtp(email, otp);

    return { message: "OTP resent successfully" };
  }

  async verifyAndRegister(data: { name: string; email: string; password: string; otp: string }) {
    const { name, email, password, otp } = data;

    if (!name || !email || !password || !otp) {
      throw HttpError.BadRequest("All fields are required");
    }

    await this.otpService.verifyOtp(email, otp);

    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw HttpError.Conflict("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);
    const created = await this.userRepo.create({
      name,
      email,
      password: hashed,
      googleUser: false,
    } as any); 

   

    return {
      message: "Registration successful",
      user: mapUserToDto(created as any),
    };
  }

  async forgotPasswordOtp(data: Partial<{ email: string }>) {
    const { email } = data;
    if (!email) {
      throw HttpError.BadRequest("Email is required");
    }
    const existingUser = await this.userRepo.findByEmail(email);
    if (!existingUser) {
      throw HttpError.NotFound("User does not exist");
    }

    const otp = await this.otpService.generateOtp(email);
    await this.otpService.sendOtp(email, otp);

    return { message: "OTP sent successfully" };
  }

  async verifyForgotPassword(data: { email: string; otp: string }) {
    const { email, otp } = data;
    if (!email || !otp) {
      throw HttpError.BadRequest("Email and OTP are required");
    }

    const existingUser = await this.userRepo.findByEmail(email);
    if (!existingUser) {
      throw HttpError.NotFound("User not found");
    }

    await this.otpService.verifyOtp(email, otp);
    return { message: "OTP verified successfully" };
  }

  async resetPassword(data: { newPassword: string; confirmPassword: string; email: string }) {
    const { newPassword, confirmPassword, email } = data;
    if (!newPassword || !confirmPassword || !email) {
      throw HttpError.BadRequest("Please include all fields");
    }
    if (newPassword !== confirmPassword) {
      throw HttpError.BadRequest("Passwords do not match");
    }

    const hash = await bcrypt.hash(newPassword, 10);
    
    const updatedUser = await this.userRepo.updateByFilter({ email }, { password: hash });
    if (!updatedUser) {
      throw HttpError.NotFound("User does not exist");
    }

    return { message: "Password reset successfully" };
  }




async login(
  data: { email: string; password: string },
  expectedRole?: ROLE,
  existingRefreshToken?: string
) {
  const { email, password } = data;

  if (!email || !password) {
    throw HttpError.BadRequest("All fields are required");
  }

  const userLean = await this.userRepo.findByEmail(email);
  if (!userLean) {
    throw HttpError.Unauthorized("User not found");
  }

  if (userLean.googleUser) {
    throw HttpError.BadRequest("Please login with Google");
  }
  const userDoc = await this.userRepo.findByEmailWithPassword(email);

  if (!userDoc || !userDoc.password) {
    throw HttpError.BadRequest("Please login with Google");
  }

  const isMatch = await bcrypt.compare(password, userDoc.password);
  if (!isMatch) {
    throw HttpError.Unauthorized("Invalid email or password");
  }

  if (userDoc.role !== expectedRole) {
  throw HttpError.Unauthorized("Invalid role for this login route");
}

 


  if (existingRefreshToken && expectedRole) {
    const session = await this.refreshTokenRepo.findByToken(existingRefreshToken);


    if (session && session.role !== expectedRole) {
      await this.refreshTokenRepo.deleteByToken(existingRefreshToken);
    }
  }

  const accessToken = this.tokenService.generateAccessToken({
    id: userDoc._id.toString(),
    role: userDoc.role,
  });

  const refreshToken = this.tokenService.generateRefreshToken({
    id: userDoc._id.toString(),
    role: userDoc.role,
  });

  await this.refreshTokenRepo.save({
    token: refreshToken,
    userId: userDoc._id.toString(),
    role: userDoc.role,
  });

  return {
    message: "Login successful",
    accessToken,
    refreshToken,
    user: mapUserToDto(userLean as any),
  };
}





  async googleLogin(data: any) {
    const idToken = data?.credential;
    if (!idToken) {
      throw HttpError.BadRequest("Google token missing");
    }

    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw HttpError.BadRequest("Invalid Google token");

    const { email, name } = payload;
    if (!email) throw HttpError.BadRequest("Google email missing");

    let user = await this.userRepo.findByEmail(email);

    if (!user) {
      const created = await this.userRepo.create({
        email,
        name,
        googleUser: true,
        password: null,
      } as any);
      user = created as any;
    }

    if(!user){
      throw HttpError.BadRequest('User creation failed..')
    }
        const accessToken = this.tokenService.generateAccessToken({
        id: user._id.toString(),
        role: user.role,
      });

        const refreshToken = this.tokenService.generateRefreshToken({
        id: user._id.toString(),
        role: user.role,
      });

    return {
      message: "Google login successful",
      accessToken,
      refreshToken,
      user: mapUserToDto(user as any),
    };
  }


async getUserById(userId: string) {
  const user = await this.userRepo.findById(userId)


  if (!user) {
    throw HttpError.Unauthorized("User not found")
  }

  return mapUserToDto(user)
}

 async logout(refreshToken: string): Promise<{ message: string }> {
    await this.refreshTokenRepo.deleteByToken(refreshToken);

    return { message: "Logged out successfully" };
  }
}
