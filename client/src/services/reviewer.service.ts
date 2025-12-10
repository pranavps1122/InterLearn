import api from "../api/axios";


interface Login {
  email:string,
  password:string
}

export const submitReviewerApplication = async (fd: FormData) => {
  try {
    const response = await api.post("/reviewer/submit", fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log('response',response.data)

  return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || "Submission failed");

  }
  
};

export const ReviewerPortalLogin = async (data:Login)=>{
  try {
    const response = await api.post('/reviewer/login',data)
    localStorage.setItem('token',response.data.token)
    return response.data
  } catch (error:any) {
    console.log('Error while interviewer login',error)
    throw new Error(error.response?.data?.message || "Login failed");
  }
}
