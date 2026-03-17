import BlogShareButtons from "./BlogShareButtons";

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
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

function getAuthorAvatar(name = "LUEVE Team") {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=f4ebff&color=7f56d9&size=96`;
}

function normalizeQuillHtml(html) {
  if (!html) return "<p>-</p>";

  return html
    .replace(/&nbsp;/g, " ")
    .replace(/<p><br><\/p>/g, "")
    .replace(/<p class="ql-align-justify"><br><\/p>/g, "")
    .replace(/<p class="ql-align-center"><br><\/p>/g, "")
    .replace(/<p class="ql-align-right"><br><\/p>/g, "")
    .trim();
}

export default function PublicBlogDetailPageContent({ blog }) {
  const coverUrl = getCoverUrl(blog.coverImage);
  const authorName = blog.author?.name || "LUEVE Team";
  const publishedAt = blog.updatedAt || blog.createdAt;
  const categoryLabel = blog.category?.name || "Blog";

  return (
    <main className="bg-white">
      <article className="mx-auto max-w-7xl px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-20">
        <header className="mx-auto max-w-7xl text-center">
          <p className="font-poppins text-sm font-semibold uppercase tracking-[0.18em] text-[#7f56d9]">
            {categoryLabel}
          </p>

          <h1 className="mt-4 font-poppins text-2xl font-semibold text-[#101828] md:text-6xl md:leading-[1.05]">
            {blog.title || "-"}
          </h1>

          <p className="mx-auto mt-6 max-w-[720px] font-poppins text-lg leading-8 text-[#667085] md:text-xl">
            {blog.excerpt || "Thoughtful insights and stories from LUEVE."}
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <img
              src={getAuthorAvatar(authorName)}
              alt={authorName}
              className="h-12 w-12 rounded-full object-cover"
            />

            <div className="text-left">
              <p className="font-poppins text-sm font-semibold text-[#101828]">
                {authorName}
              </p>
              <p className="font-poppins text-sm text-[#667085]">
                {formatDate(publishedAt)}
              </p>
            </div>
          </div>
        </header>

        {coverUrl && (
          <div className="mx-auto mt-12 max-w-7xl overflow-hidden rounded-[28px] shadow-[0_12px_40px_rgba(16,24,40,0.08)]">
            <img
              src={coverUrl}
              alt={blog.title || "Blog cover"}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <section className="mt-14 md:mt-16">
          <div className="mx-auto max-w-7xl">
            <div
              className="blog-content-preview"
              dangerouslySetInnerHTML={{
                __html: normalizeQuillHtml(blog.content),
              }}
            />
          </div>
        </section>

        <div className="mt-20">
          <BlogShareButtons
            title={blog.title || "Check out this article"}
            excerpt={blog.excerpt || ""}
          />
        </div>
      </article>
    </main>
  );
}
