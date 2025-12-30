import api from "../api/axios"



export async function PendingReviewers(){
    try {
        const response = await api.get('/admin/pending-reviewers')
        console.log('response',response)
        return response.data.result
    } catch (error:any) {
         throw new Error(error.response?.data?.message || "Data fetching failed");
    }
}


export async function ApprovedReviewers(){
    try {
        const response = await api.get('/admin/approved-reviewers')
        console.log('response',response)
        return response.data.result
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

export async function RejectReviewer(id: string, rejectionNote: string) {
  try {
    const response = await api.patch(`/admin/reject-reviewer/${id}`, {
      rejection_note: rejectionNote,
    });
    return response.data;
  } catch (error: any) {
    throw error
  }
}


export async function BlockReviewer(id:string){
    try {
        const reviewerId=id
        const response = await api.patch(`/admin/block-reviewer/${reviewerId}`)
        return response.data
    } catch (error) {
       throw new Error(error.response?.data?.message || "Block failed");  
    }
}

export async function UnblockReviewer(id:string){
    try {
        const reviewerId = id
        const response = await api.patch(`/admin/unblock-reviewer/${reviewerId}`)
        return response.data
    } catch (error) {
         throw new Error(error.response?.data?.message || "Unblock failed");  
    }
}

export async function GetAllUsers(){
    try {
        const response = await api.get('/admin/all-users')
        console.log('response',response)
        return response.data.result
    } catch (error:any) {
        throw new Error(error.response?.data?.message||'Data fetching failed')
    }
}

export async function GetSpecificUser(id:string){
    try {
        const userId = id
        const response = await api.get(`/admin/specific-user/${userId}`)
        return response.data
    } catch (error:any) {
        throw new Error(error.response?.data?.message||'Data fetching failed')
    }
}
export async function DeleteUser(id:string){
    try {
        const userId = id
        const response = await api.delete(`/admin/delete-user/${userId}`)
        return response.data
    } catch (error:any) {
        throw new Error(error.response?.data?.message||'User deletion failed')
    }
}

export async function BlockUser(id:string){
    try {
        const userId = id
        const response = await api.patch(`/admin/block-user/${userId}`)
        return response.data
    } catch (error:any) {
        throw new Error(error.response?.data?.message||'User block failed')
    }
}

export async function UnblockUser(id:string){
     try {
        const userId = id
        const response = await api.patch(`/admin/unblock-user/${userId}`)
        return response.data
    } catch (error:any) {
        throw new Error(error.response?.data?.message||'User unblock failed')
    }
}