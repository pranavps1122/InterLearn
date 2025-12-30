import { AdminRepository } from "../repository/admin.repository";


export class UserManagementService {
    constructor(
        private adminRepo : AdminRepository
    ){}

    /* GetAllUsers */
 
     async getAllUsers(){
        try {
            const users = await this.adminRepo.Students()
            return users
        } catch (error) {
              console.log('error fetching reviewer',error)
            throw new Error('errror while fetching reviewer')
        }
    }

    /* BlockUsers */
      async blockUser(id:string){
        try {
            const userId = id
            const user = await this.adminRepo.update(
                userId,
                {
                    is_active:false
                }
            )
            if(!user){
                throw new Error('User not found')
            }
            return true
        } catch (error) {
             console.log('error while block user',error)
            throw new Error('error while block user')
        }
    }

    /* Unblock Reviewer */
      async unblockUser(id:string){
        try {
            const userId = id
            const user = await this.adminRepo.update(
                userId,
                {
                    is_active:true
                }
            )
            if(!user){
                throw new Error('User not found')
            }
            return true
        } catch (error) {
             console.log('error while unblock user',error)
            throw new Error('error while unblock user')
        }
    }

    /* Delete User */
      async deleteUser(id:string){
        try {
            const userId = id
            const user = await this.adminRepo.DeleteById(userId)
            if(!user){
                throw new Error('User not found')
            }
            return true
        } catch (error) {
             console.log('error while delete user',error)
            throw new Error('error while block user')
        }
    }
}