import axiosInstance from "@/lib/axios";

export async function getBlogDetailApi(id) {
  const response = await axiosInstance.get(`/blogs/${id}`);
  return response.data;
}
