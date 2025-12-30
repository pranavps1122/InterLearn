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
  console.log('data',data)
    try {
    const response = await api.post("/auth/register/request-otp", data);

 
    return response.data; 
    } catch (error) {
      console.error(error)
        throw error
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



export async function login(data: LoginInput) {
  const response = await api.post("/auth/login", data);

  const accessToken = response?.data?.data?.accessToken;
  const user = response?.data?.data?.user;

  if (!accessToken || !user) {
    throw new Error("Invalid login response");
  }

  localStorage.setItem('accessToken',accessToken)

  return { user, accessToken };
}

export async function logoutService() {
  await api.post("/auth/logout");
}


export async function AdminPortalLogin(data: LoginInput) {
  const response = await api.post("/auth/admin/login", data);

  const accessToken = response?.data?.data?.accessToken;
  const user = response?.data?.data?.user;

  if (!accessToken || !user) {
    throw new Error("Invalid admin login response");
  }

 
  localStorage.setItem('accessToken',accessToken)

  return { user, accessToken };
}

export const ReviewerPortalLogin = async (data:LoginInput)=>{
  try {
    const response = await api.post('/auth/reviewer/login',data)
     const accessToken = response?.data?.data?.accessToken;
     const user = response?.data?.data?.user;
    return { user, accessToken };
  } catch (error:any) {
    console.log('Error while interviewer login',error)
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
  const response = await api.post("/auth/google", data);

  const accessToken = response?.data?.data?.accessToken;
  const user = response?.data?.data?.user;

  if (!accessToken || !user) {
    throw new Error("Invalid Google login response");
  }


  localStorage.setItem("activeRole", user.role);
  localStorage.setItem(`${user.role}_accessToken`, accessToken);

  return { user, accessToken };
}

