import axiosInstance from "@/lib/axios";

export async function deleteBlogApi(id) {
  const response = await axiosInstance.delete(`/blogs/${id}`);
  return response.data;
}
