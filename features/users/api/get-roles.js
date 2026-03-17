import axiosInstance from "@/lib/axios";

export async function getRolesApi() {
  const response = await axiosInstance.get("/users/roles");
  return response.data;
}