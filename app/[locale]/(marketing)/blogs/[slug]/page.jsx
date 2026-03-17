import { notFound } from "next/navigation";
import { getPublicBlogBySlug } from "@/features/blogs/api/get-public-blog-by-slug";
import PublicBlogDetailPageContent from "@/features/blogs/components/PublicBlogDetailPageContent";

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const blog = await getPublicBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <PublicBlogDetailPageContent blog={blog} />;
}
