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
    try {
       const response = await api.post("/auth/register/request-otp", data);
    return response.data; 
    } catch (error) {
        console.error('error while register',error)
    }
    
}

export async function OtpVerification(data: VerifyInput) {
    try {
    const response = await api.post('/auth/register/verify', data);
    return response.data;
    } catch (error:any) {
       throw new Error(error.response?.data?.message || "Registration failed"); 
    }
    
}
export async function resendOtp(data:resendInput){
    const response = await api.post('/auth/register/resend-otp',data)
    return response.data
}
export async function UserLogin(data: LoginInput) {
  console.log("[UserLogin] called with:", data);

  try {
    const response = await api.post("/auth/login", data);

    const accessToken =
      response?.data?.data?.accessToken ??
      response?.data?.accessToken ??
      response?.data?.token ??
      null;

    const user =
      response?.data?.data?.user ??
      response?.data?.user ??
      null;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      console.log("[UserLogin] saved accessToken");
    } else {
      console.warn("[UserLogin] no accessToken in response", response?.data);
    }

    return {
      message: response?.data?.message ?? "Login response",
      user,
      accessToken,
      raw: response?.data,
    };
  } catch (error: any) {
    
    console.error("[UserLogin] error while login:", {
      message: error.message,
      code: error.code, // e.g. 'ERR_NETWORK'
      requestSent: !!error.request,
      status: error.response?.status ?? null,
      responseData: error.response?.data ?? null,
    });

    throw new Error(
      error.response?.data?.message || error.message || "Login failed"
    );
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

    
    const accessToken =
      response?.data?.data?.accessToken ??
      response?.data?.accessToken ??
      response?.data?.token ??
      null;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken); 
    }

    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || "Google Authentication failed");
  }
}

