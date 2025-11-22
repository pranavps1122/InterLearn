import api from "../api/axios";

export const submitReviewerApplication = async (fd: FormData) => {
  const response = await api.post("/reviewer/submit", fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
