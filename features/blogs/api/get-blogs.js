import axiosInstance from "@/lib/axios";

export async function getBlogsApi(params = {}) {
  const response = await axiosInstance.get("/blogs", {
    params,
  });

  return response.data;
}
