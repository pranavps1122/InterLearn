export interface IAuthOtpService {
  requestRegisterOtp(data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<{ message: string }>;

  resendOtp(data: {
    email: string;
  }): Promise<{ message: string }>;

  verifyAndRegister(data: {
    name: string;
    email: string;
    password: string;
    otp: string;
  }): Promise<{
    message: string;
    user: any;
  }>;
}
