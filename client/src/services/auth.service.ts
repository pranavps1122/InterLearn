import api from '../api/axios'

interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

interface VerifyInput {
    name: string;
    email: string;
    password: string;
    otp: string;
}

interface LoginInput {
    email: string;
    password: string;
}

interface GoogleAuthInput {
    credential: string;
}

interface resendInput{
    email:string
}
interface requestForgotPassowrd{
    email:string
}
interface VerifyForgotPassword{
    email:string,
    otp:string
}
interface ResetPassword{
    newPassword:string,
    confirmPassword:string,
    email:string
    
}
export async function requestOtp(data: RegisterInput) {
    const response = await api.post("/auth/register/request-otp", data);
    return response.data;
}

export async function OtpVerification(data: VerifyInput) {
    const response = await api.post('/auth/register/verify', data);
    return response.data;
}
export async function resendOtp(data:resendInput){
    const response = await api.post('/auth/register/resend-otp',data)
    return response.data
}
export async function UserLogin(data: LoginInput) {
  try {
    const response = await api.post('/auth/login', data);
    console.log('user login response',response)
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");

  }
}

export async function requestForgotPasswordOtp(data:requestForgotPassowrd) {
    try {
       const response = await api.post('/auth/forgot-password',data)
       return response.data 
    } catch (error) {
        console.log('error while requestForgotPassowrd',error)
    }
}

export async function VerifyForgotPasswordOtp(data:VerifyForgotPassword) {
    try {
        const response = await api.post('/auth/verify-forgot-password',data)
        return response.data
    } catch (error) {
       console.log('error while verifyOtp',error) 
    }
}

export async function ResetForgotPassword(data:ResetPassword) {
    try {
       const response = await api.post('/auth/reset-password',data)
        return response.data
    } catch (error) {
        console.log('error while resetpassword',error)
    }
    
}

export async function GoogleAuth(data: GoogleAuthInput) {
    try {
       const response = await api.post('/auth/google', data);
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }

    return response.data; 
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "Google Authentication failed");
        
    }
    
}
