import axiosInstance from "@/lib/axios";

export async function logoutApi(refreshToken) {
  const response = await axiosInstance.post("/auth/logout", { refreshToken });
  return response.data;
}
