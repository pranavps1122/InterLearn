import api from "../api/axios";

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
