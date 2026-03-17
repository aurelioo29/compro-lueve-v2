function getApiBaseUrl() {
  return (
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:4000/api"
  );
}

export async function getPublicBlogBySlug(slug) {
  const baseUrl = getApiBaseUrl();

  const response = await fetch(`${baseUrl}/blogs`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch blog");
  }

  const allBlogs = data?.data || [];

  const blog = allBlogs.find(
    (item) =>
      String(item.slug || "") === String(slug) &&
      String(item.status || "").toUpperCase() === "PUBLISHED",
  );

  if (!blog) {
    return null;
  }

  return blog;
}
