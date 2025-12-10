import { RegisterDto } from "./auth.dto";
import bcrypt from "bcryptjs";
import OtpService from "./otp.service";
import generateToken from "../../core/utils/generateToken";
import otpModel from "./otp.model";
import { OAuth2Client } from "google-auth-library";
import { HttpError } from "@/core/errors/httpError";
import { UserRepository } from "./repository/user.repository";
import { mapUserToDto } from "./mappers/user.mapper";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const otpService = new OtpService();
const userRepo = new UserRepository();

export default class AuthService {
  async requestRegisterOtp(data: Partial<RegisterDto>) {
    const { name, email, password, confirmPassword } = data;

    if (!name || !email || !password || !confirmPassword) {
      throw HttpError.BadRequest("All fields are required");
    }
    if (password !== confirmPassword) {
      throw HttpError.BadRequest("Passwords do not match");
    }

    const existing = await userRepo.findByEmail(email);
    if (existing) {
     
      throw HttpError.Conflict("User already exists");
    }

    const otp = await otpService.generateOtp(email);
    await otpService.sendOtp(email, otp);

    return { message: "OTP sent to your email" };
  }

  async resendOtp(data: Partial<{ email: string }>) {
    const { email } = data;
    if (!email) {
      throw HttpError.BadRequest("Email is required");
    }

    await otpModel.deleteMany({ email });

    const existing = await userRepo.findByEmail(email);
    if (existing) {
      throw HttpError.Conflict("User already exists");
    }

    const otp = await otpService.generateOtp(email);
    await otpService.sendOtp(email, otp);

    return { message: "OTP resent successfully" };
  }

  async verifyAndRegister(data: { name: string; email: string; password: string; otp: string }) {
    const { name, email, password, otp } = data;

    if (!name || !email || !password || !otp) {
      throw HttpError.BadRequest("All fields are required");
    }

    await otpService.verifyOtp(email, otp);

    const existing = await userRepo.findByEmail(email);
    if (existing) {
      throw HttpError.Conflict("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);
    const created = await userRepo.create({
      name,
      email,
      password: hashed,
      googleUser: false,
    } as any); 

    const token = generateToken((created as any)._id.toString(), (created as any).role);

    return {
      message: "Registration successful",
      token,
      user: mapUserToDto(created as any),
    };
  }

  async forgotPasswordOtp(data: Partial<{ email: string }>) {
    const { email } = data;
    if (!email) {
      throw HttpError.BadRequest("Email is required");
    }
    const existingUser = await userRepo.findByEmail(email);
    if (!existingUser) {
      throw HttpError.NotFound("User does not exist");
    }

    const otp = await otpService.generateOtp(email);
    await otpService.sendOtp(email, otp);

    return { message: "OTP sent successfully" };
  }

  async forgotPasswordOtpVerification(data: { email: string; otp: string }) {
    const { email, otp } = data;
    if (!email || !otp) {
      throw HttpError.BadRequest("Email and OTP are required");
    }

    const existingUser = await userRepo.findByEmail(email);
    if (!existingUser) {
      throw HttpError.NotFound("User not found");
    }

    await otpService.verifyOtp(email, otp);
    return { message: "OTP verified successfully" };
  }

  async changeForgotPassword(data: { newPassword: string; confirmPassword: string; email: string }) {
    const { newPassword, confirmPassword, email } = data;
    if (!newPassword || !confirmPassword || !email) {
      throw HttpError.BadRequest("Please include all fields");
    }
    if (newPassword !== confirmPassword) {
      throw HttpError.BadRequest("Passwords do not match");
    }

    const hash = await bcrypt.hash(newPassword, 10);
    
    const updatedUser = await userRepo.updateByFilter({ email }, { password: hash });
    if (!updatedUser) {
      throw HttpError.NotFound("User does not exist");
    }

    return { message: "Password reset successfully" };
  }

  async userLogin(data: { email: string; password: string }) {
    const { email, password } = data;

    if (!email || !password) {
      throw HttpError.BadRequest("All fields are required");
    }

    // get a lean object for fast check
    const userLean = await userRepo.findByEmail(email);
    if (!userLean) {
      // security-first: generic unauthorized, or use NotFound if desired
      throw HttpError.Unauthorized("Invalid email or password");
    }

    if (userLean.googleUser) {
      throw HttpError.BadRequest("Please login with Google");
    }

    // fetch full doc with password for comparison
    const userDoc = await userRepo.findByEmailWithPassword(email);
    if (!userDoc || !userDoc.password) {
      throw HttpError.BadRequest("Please login with Google");
    }

    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (!isMatch) {
      throw HttpError.Unauthorized("Invalid email or password");
    }

    const token = generateToken(userDoc._id.toString(), userDoc.role);

    return {
      message: "Login successful",
      token,
      user: mapUserToDto(userLean as any),
    };
  }

  async googleAuthLogin(data: any) {
    const idToken = data?.credential;
    if (!idToken) {
      throw HttpError.BadRequest("Google token missing");
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw HttpError.BadRequest("Invalid Google token");

    const { email, name } = payload;
    if (!email) throw HttpError.BadRequest("Google email missing");

    let user = await userRepo.findByEmail(email);

    if (!user) {
      const created = await userRepo.create({
        email,
        name,
        googleUser: true,
        password: null,
      } as any);
      user = created as any;
    }

    const token = generateToken((user as any)._id.toString(), (user as any).role);

    return {
      message: "Google login successful",
      token,
      user: mapUserToDto(user as any),
    };
  }
}
