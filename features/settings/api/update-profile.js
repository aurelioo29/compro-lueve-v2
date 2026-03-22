import axiosInstance from "@/lib/axios";

export async function updateProfileApi(payload) {
  const response = await axiosInstance.patch("/settings/profile", payload);
  return response.data;
}
