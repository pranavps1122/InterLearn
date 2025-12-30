export interface IAuthUserService{
    getUserById(userId:string):Promise<any>
}