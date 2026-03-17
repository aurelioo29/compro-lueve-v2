"use client";

import { useMemo, useState } from "react";
import PublicBlogCard from "./PublicBlogCard";

export default function PublicBlogsPageContent({
  blogs = [],
  locale = "en",
  title = "Resources and insights",
  description = "The latest industry news, interviews, technologies, and resources.",
  badge = "Our blog",
}) {
  const [search, setSearch] = useState("");

  const filteredBlogs = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return blogs;

    return blogs.filter((blog) => {
      const haystack = [
        blog.title,
        blog.excerpt,
        blog.content,
        blog.author?.name,
        blog.slug,
        blog.category?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(keyword);
    });
  }, [blogs, search]);

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 md:px-10 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-[860px] text-center">
          <div className="inline-flex items-center rounded-full bg-[#f4ebff] px-4 py-2">
            <span className="font-poppins text-sm font-medium text-[#7f56d9]">
              {badge}
            </span>
          </div>

          <h1 className="mt-6 font-poppins text-5xl font-semibold tracking-[-0.04em] text-[#42307d] md:text-6xl">
            {title}
          </h1>

          <p className="mx-auto mt-6 max-w-[760px] font-poppins text-xl leading-9 text-[#6941c6]">
            {description}
          </p>

          <div className="mx-auto mt-10 max-w-[420px]">
            <div className="flex items-center rounded-xl border border-[#d0d5dd] bg-white px-4 py-4 shadow-sm">
              <svg
                className="mr-3 h-5 w-5 text-[#667085]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-full border-none bg-transparent font-poppins text-lg text-[#667085] outline-none placeholder:text-[#667085]"
              />
            </div>
          </div>
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <PublicBlogCard key={blog.id} blog={blog} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-20 max-w-[720px] rounded-2xl border border-[#eaecf0] bg-white px-8 py-14 text-center shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
            <h2 className="font-poppins text-2xl font-semibold text-[#101828]">
              No matching articles found
            </h2>
            <p className="mt-3 font-poppins text-base leading-8 text-[#667085]">
              Try using a different keyword or check back later for new posts.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
