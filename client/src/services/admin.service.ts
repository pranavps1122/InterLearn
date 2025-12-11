import api from "../api/axios"


export async function AdminPortalLogin(email:string,password:string) {
    try {
        const data={email,password}
        console.log(data)
        const response = await api.post('/admin/login',data)
        console.log('admin data',response.data)
        return response.data
       
    } catch (error:any) {
        console.log('Error while login with admin',error)
        
        throw new Error(error.response?.data?.message || "Login failed");
    }
}

export async function GetAllReviewers(){
    try {
        const response = await api.get('/admin/all-reviewers')
        return response.data
    } catch (error:any) {
         throw new Error(error.response?.data?.message || "Data fetching failed");
    }
}

export async function DeleteReviewer(id:string){
    try {
       const reviewerId=id
       console.log(reviewerId)
       const response = await api.delete(`/admin/delete-reviewer/${reviewerId}`)
       return response.data 
    } catch (error:any) {
       throw new Error(error.response?.data?.message || "Deletion failed"); 
    }
}

export async function ApproveReviewer(id:string){
    try {
        const reviewerId=id
        const response = await api.patch(`/admin/approve-reviewer/${reviewerId}`)
        return response.data
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "Approve failed"); 
    }
}

export async function RejectReviewer(id:string){
    try {
        const reviewerId=id
        const response= await api.patch(`/admin/reject-reviewer${reviewerId}`)
        return response.data
    } catch (error:any) {
     throw new Error(error.response?.data?.message || "Reject failed"); 
    }
}