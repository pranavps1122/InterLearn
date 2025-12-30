import UserModel  from '../auth/models/auth.model'


export default class UserService {
    async UserProfile (userId:string){
    const user = await UserModel.findById(userId).select("-password")
    if(!user){
        throw new Error('User not found')
    }
    return user
    }
}

