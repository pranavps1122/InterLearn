import { ROLE } from "@/core/constants/roles";
export interface IAuthLoginService {
    login(credential:{email:string,password:string},expectedRole?: ROLE,existingRefreshToken?: string) : Promise<any>
    googleLogin(token: string): Promise<any>;
}