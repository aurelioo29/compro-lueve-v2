import axiosInstance from "@/lib/axios";

export async function getUsersApi(params = {}) {
  const response = await axiosInstance.get("/users", {
    params,
  });

  return response.data;
}
