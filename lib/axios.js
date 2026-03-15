import axios from "axios";
import { useAuthStore } from "@/features/auth/store/auth-store";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      useAuthStore.getState().logout();

      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        const locale = currentPath.split("/")[1] || "en";
        window.location.href = `/${locale}/login`;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
