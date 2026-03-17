import Link from "next/link";

function stripHtml(html = "") {
  return String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getCoverUrl(coverImage) {
  if (!coverImage) return null;

  const apiBase =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:4000/api";

  const origin = apiBase.replace("/api", "");

  return `${origin}${coverImage}`;
}

function getAuthorAvatar(name = "Lueve") {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=f3e8ff&color=6d28d9&size=64`;
}

export default function PublicBlogCard({ blog, locale = "en" }) {
  const previewText =
    blog.excerpt?.trim() || stripHtml(blog.content || "").slice(0, 120);

  const coverUrl = getCoverUrl(blog.coverImage);
  const authorName = blog.author?.name || "LUEVE Team";
  const publishedAt = blog.updatedAt || blog.createdAt;
  const categoryLabel = blog.category?.name || "Blog";

  return (
    <article className="h-full rounded-none bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(17,24,39,0.10)]">
      <Link href={`/${locale}/blogs/${blog.slug}`} className="block h-full">
        <div className="flex h-full flex-col">
          <div className="aspect-[4/3] w-full overflow-hidden bg-[#f5f5f5]">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={blog.title || "Blog cover"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-[#98a2b3]">
                No cover image
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-1 flex-col">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-poppins text-sm font-semibold text-[#7f56d9]">
                  {categoryLabel}
                </p>
                <h3 className="mt-3 font-poppins text-[20px] font-semibold leading-[1.35] tracking-[-0.02em] text-[#101828]">
                  {blog.title || "-"}
                </h3>
              </div>

              <span className="mt-1 shrink-0 text-[#101828]">↗</span>
            </div>

            <p className="line-clamp-3 font-poppins text-base leading-8 text-[#667085]">
              {previewText || "-"}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <img
                src={getAuthorAvatar(authorName)}
                alt={authorName}
                className="h-10 w-10 rounded-full object-cover"
              />

              <div className="min-w-0">
                <p className="truncate font-poppins text-base font-medium text-[#101828]">
                  {authorName}
                </p>
                <p className="font-poppins text-sm text-[#667085]">
                  {formatDate(publishedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
