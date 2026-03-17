import axiosInstance from "@/lib/axios";

export async function createUserApi(payload) {
  const response = await axiosInstance.post("/users", payload);
  return response.data;
}
