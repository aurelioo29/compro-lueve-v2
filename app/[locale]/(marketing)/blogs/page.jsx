import { getPublicBlogs } from "@/features/blogs/api/get-public-blogs";
import PublicBlogsPageContent from "@/features/blogs/components/PublicBlogsPageContent";

export const dynamic = "force-dynamic";

export default async function BlogsPage({ params }) {
  const { locale } = await params;

  const result = await getPublicBlogs({
    page: 1,
    limit: 12,
    sortBy: "createdAt",
    order: "desc",
  });

  const allBlogs = result?.data || [];

  const publishedBlogs = allBlogs.filter(
    (blog) => String(blog.status || "").toUpperCase() === "PUBLISHED",
  );

  return (
    <PublicBlogsPageContent
      locale={locale}
      blogs={publishedBlogs}
      title="Journal & Insights"
      description="Explore articles, ideas, and thoughtful perspectives from LUEVE."
    />
  );
}
