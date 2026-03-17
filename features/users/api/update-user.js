import axiosInstance from "@/lib/axios";

export async function updateUserApi({ id, payload }) {
  const response = await axiosInstance.patch(`/users/${id}`, payload);
  return response.data;
}
