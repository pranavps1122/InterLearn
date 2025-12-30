export interface IAuthPasswordService{
    forgotPasswordOtp(data:{
        email:string,
    }):Promise<{message:string}>

    verifyForgotPassword(data:{
        email:string,
        otp:string,
    }):Promise<{message:string}>

    resetPassword(data:{
        email:string,
        newPassword:string,
        confirmPassword:string
    }):Promise<{message:string}>

      logout(refreshToken: string): Promise<{ message: string }>;
}