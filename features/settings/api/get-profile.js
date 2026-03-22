import axiosInstance from "@/lib/axios";

export async function getProfileApi() {
  const response = await axiosInstance.get("/settings/profile");
  return response.data;
}
