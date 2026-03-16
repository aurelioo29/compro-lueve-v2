import axiosInstance from "@/lib/axios";

export async function loginApi(payload) {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
}
