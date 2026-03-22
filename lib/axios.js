import axios from "axios";
import { useAuthStore } from "@/features/auth/store/auth-store";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
}

function getLocaleFromPath() {
  if (typeof window === "undefined") return "en";

  const currentPath = window.location.pathname;
  const firstSegment = currentPath.split("/")[1];

  if (firstSegment === "id" || firstSegment === "en") {
    return firstSegment;
  }

  return "en";
}

function redirectToLogin() {
  if (typeof window === "undefined") return;

  const locale = getLocaleFromPath();
  window.location.href = `/${locale}/login`;
}

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
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // bukan 401, lempar aja
    if (status !== 401) {
      return Promise.reject(error);
    }

    const requestUrl = originalRequest?.url || "";
    const isLoginRequest = requestUrl.includes("/auth/login");
    const isRefreshRequest = requestUrl.includes("/auth/refresh");
    const isLogoutRequest = requestUrl.includes("/auth/logout");

    // jangan refresh untuk endpoint auth tertentu
    if (isLoginRequest || isRefreshRequest || isLogoutRequest) {
      useAuthStore.getState().logout();
      redirectToLogin();
      return Promise.reject(error);
    }

    // cegah retry berkali-kali
    if (originalRequest._retry) {
      useAuthStore.getState().logout();
      redirectToLogin();
      return Promise.reject(error);
    }

    const refreshToken = useAuthStore.getState().refreshToken;

    if (!refreshToken) {
      useAuthStore.getState().logout();
      redirectToLogin();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshResponse = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const refreshData = refreshResponse?.data?.data;

      const newAccessToken = refreshData?.accessToken;
      const newRefreshToken = refreshData?.refreshToken;

      if (!newAccessToken) {
        throw new Error("Access token baru tidak ditemukan");
      }

      useAuthStore.setState((state) => ({
        ...state,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken || state.refreshToken,
        user: refreshData?.user || state.user,
        isAuthenticated: true,
      }));

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      useAuthStore.getState().logout();
      redirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosInstance;
