import axiosInstance from "@/lib/axios";

export async function createBlogApi(payload) {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("content", payload.content);

  if (payload.excerpt !== undefined) {
    formData.append("excerpt", payload.excerpt || "");
  }

  if (payload.status) {
    formData.append("status", payload.status);
  }

  if (payload.coverImage) {
    formData.append("coverImage", payload.coverImage);
  }

  const response = await axiosInstance.post("/blogs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
