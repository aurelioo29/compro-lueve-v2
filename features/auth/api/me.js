import axiosInstance from "@/lib/axios";

export async function meApi() {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
}
