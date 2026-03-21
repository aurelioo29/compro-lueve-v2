"use client";

function getStatusBadgeClass(status) {
  switch (String(status || "").toUpperCase()) {
    case "PUBLISHED":
      return "bg-[#dcfce7] text-[#15803d]";
    case "DRAFT":
      return "bg-[#fef3c7] text-[#b45309]";
    case "ARCHIVED":
      return "bg-[#fee2e2] text-[#b91c1c]";
    default:
      return "bg-[#f3f4f6] text-[#374151]";
  }
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-xl border border-[#eef0f4] bg-[#fafafa] px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9ca3af]">
        {label}
      </p>
      <p className="mt-2 break-words text-sm leading-6 text-[#374151]">
        {value || "-"}
      </p>
    </div>
  );
}

export default function CollectionItemInfoCard({ item }) {
  if (!item) return null;

  const categoryLabel = item.category?.parent?.name
    ? `${item.category.parent.name} / ${item.category.name}`
    : item.category?.name || "-";

  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
            Item Overview
          </p>
          <h3 className="mt-2 text-[22px] font-bold tracking-[-0.02em] text-[#111827]">
            {item.name || "-"}
          </h3>
        </div>

        <span
          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusBadgeClass(
            item.status,
          )}`}
        >
          {item.status || "-"}
        </span>
      </div>

      <div className="mt-5 grid gap-3">
        <InfoRow label="Slug" value={item.slug} />
        <InfoRow label="Category" value={categoryLabel} />
        <InfoRow label="Meaning" value={item.meaning || "No meaning"} />
        <InfoRow
          label="Description"
          value={item.description || "No description"}
        />
        <InfoRow label="Sort Order" value={String(item.sortOrder ?? 0)} />
      </div>
    </div>
  );
}
