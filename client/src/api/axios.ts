
import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const getAccessToken = () => localStorage.getItem("accessToken");
const setAccessToken = (token: string | null) => {
  if (token) localStorage.setItem("accessToken", token);
  else localStorage.removeItem("accessToken");
};
const onRefreshFail = () => {
  setAccessToken(null);
  window.location.href = "/login";
};

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (!token) return config;

  const headers = config.headers as any;
  if (headers && typeof headers.set === "function") {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
 
    (config.headers as Record<string, string | number | boolean>) = {
      ...(config.headers as Record<string, string | number | boolean>),
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

let isRefreshing = false;
type QueueItem = {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: InternalAxiosRequestConfig;
};
let failedQueue: QueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
 
      const headers = config.headers as any;
      if (token) {
        if (headers && typeof headers.set === "function") {
          headers.set("Authorization", `Bearer ${token}`);
        } else {
          (config.headers as Record<string, string | number | boolean>) = {
            ...(config.headers as Record<string, string | number | boolean>),
            Authorization: `Bearer ${token}`,
          };
        }
      }
      resolve(api(config));
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError & { config?: InternalAxiosRequestConfig }) => {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

   
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }
    if (originalRequest.url?.includes("/auth/refresh-token")) {
      onRefreshFail();
      return Promise.reject(error);
    }

    if ((originalRequest as any)._retry) {
      return Promise.reject(error);
    }

    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject, config: originalRequest });

      if (!isRefreshing) {
        isRefreshing = true;

        api
          .get("/auth/refresh-token")
          .then((res) => {
          
            const newAccessToken =
              (res.data && (res.data.accessToken ?? res.data.data?.accessToken)) || null;

            if (!newAccessToken) {
              throw new Error("No access token in refresh response");
            }

            setAccessToken(newAccessToken);
            processQueue(null, newAccessToken);
          })
          .catch((refreshErr) => {
            processQueue(refreshErr, null);
            onRefreshFail();
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
    });
  }
);

export default api;
