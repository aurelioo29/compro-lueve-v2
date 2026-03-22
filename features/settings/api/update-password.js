import axiosInstance from "@/lib/axios";

export async function updatePasswordApi(payload) {
  const response = await axiosInstance.patch("/settings/password", payload);
  return response.data;
}
