import api from '../api/axios'

interface RegisterInput {
    name:string,
    email:string,
    password:string
}
interface VerifyInput {
  name:string,
  email:string,
  password:string,
  otp:string
}
interface LoginInput {
    email:string,
    password:string
}


export async function requestOtp(data:RegisterInput) {
    const response = await api.post("/auth/register/request-otp",data)
    console.log(response.data)
    return response.data
}

export async function OtpVerification(data:VerifyInput) {
    const response = await api.post('/auth/register/verify',data)
    return response.data
}

export async function UserLogin(data:LoginInput) {
    const response = await api.post('/auth/login',data)
    localStorage.setItem("token",response.data.token)
    return response.data
}