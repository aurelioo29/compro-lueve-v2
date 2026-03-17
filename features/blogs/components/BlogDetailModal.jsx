"use client";

import DashboardModal from "@/app/components/ui/DashboardModal";
import { useBlogDetail } from "../hooks/useBlogDetail";

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
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

export default function BlogDetailModal({ open, onClose, blogId }) {
  const { data, isLoading, isError, error } = useBlogDetail(blogId, open);
  const item = data?.data;

  return (
    <DashboardModal
      open={open}
      onClose={onClose}
      title="Blog Detail"
      description="Review blog information, content, and publication data."
      size="xl"
    >
      <div className="w-full max-w-7xl space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
            Blog
          </p>
          <h2 className="mt-1 text-3xl font-bold text-[#111827]">
            Blog Detail
          </h2>
        </div>

        {isLoading ? (
          <p className="text-sm text-[#6b7280]">Loading detail...</p>
        ) : isError ? (
          <p className="text-sm text-red-600">
            {error?.response?.data?.message || "Failed to load detail"}
          </p>
        ) : item ? (
          <div className="space-y-5">
            {item.coverImage && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "")}${item.coverImage}`}
                alt={item.title || "Blog cover"}
                className="h-56 w-full rounded-2xl object-cover"
              />
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-[#6b7280]">Title</p>
                <p className="mt-1 font-medium text-[#111827]">
                  {item.title || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-[#6b7280]">Slug</p>
                <p className="mt-1 font-medium text-[#111827]">
                  {item.slug || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-[#6b7280]">Status</p>
                <p className="mt-1 font-medium text-[#111827]">
                  {item.status || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-[#6b7280]">Author</p>
                <p className="mt-1 font-medium text-[#111827]">
                  {item.author?.name || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-[#6b7280]">Created At</p>
                <p className="mt-1 font-medium text-[#111827]">
                  {formatDate(item.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-sm text-[#6b7280]">Updated At</p>
                <p className="mt-1 font-medium text-[#111827]">
                  {formatDate(item.updatedAt)}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-[#6b7280]">Excerpt</p>
              <p className="mt-1 whitespace-pre-line font-medium text-[#111827]">
                {item.excerpt || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#6b7280]">Content</p>

              <div className="mt-2 rounded-2xl border border-[#eef0f4] bg-white p-5">
                <div className="blog-content-scroll max-h-[500px] overflow-y-auto overflow-x-hidden">
                  <div
                    className="blog-content-preview"
                    dangerouslySetInnerHTML={{
                      __html: normalizeQuillHtml(item.content),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </DashboardModal>
  );
}
