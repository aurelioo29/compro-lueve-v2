import axiosInstance from "@/lib/axios";

export async function updateBlogApi({ id, payload }) {
  const formData = new FormData();

  if (payload.title !== undefined) {
    formData.append("title", payload.title);
  }

  if (payload.excerpt !== undefined) {
    formData.append("excerpt", payload.excerpt || "");
  }

  if (payload.content !== undefined) {
    formData.append("content", payload.content);
  }

  if (payload.status !== undefined) {
    formData.append("status", payload.status);
  }

  if (payload.coverImage) {
    formData.append("coverImage", payload.coverImage);
  }

  const response = await axiosInstance.put(`/blogs/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
