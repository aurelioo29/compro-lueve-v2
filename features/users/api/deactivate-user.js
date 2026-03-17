import axiosInstance from "@/lib/axios";

export async function deactivateUserApi(id) {
  const response = await axiosInstance.patch(`/users/${id}/deactivate`);
  return response.data;
}
