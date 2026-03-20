"use client";

import { FolderKanban, CheckCircle2, Ban, Boxes } from "lucide-react";

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
}) {
  return (
    <div className="rounded-[22px] bg-white p-5 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#6b7280]">{title}</p>
          <h3 className="mt-3 text-[24px] font-bold tracking-[-0.02em] text-[#111827]">
            {value}
          </h3>
          <p className="mt-2 text-sm text-[#9ca3af]">{subtitle}</p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <Icon size={24} className={iconColor} />
        </div>
      </div>
    </div>
  );
}

export default function CollectionCategoriesSummaryCards({
  total = 0,
  active = 0,
  inactive = 0,
  totalItems = 0,
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Categories"
        value={String(total)}
        subtitle="All collection categories"
        icon={FolderKanban}
        iconBg="bg-[#ede9fe]"
        iconColor="text-[#7c3aed]"
      />

      <SummaryCard
        title="Active Categories"
        value={String(active)}
        subtitle="Currently enabled"
        icon={CheckCircle2}
        iconBg="bg-[#dcfce7]"
        iconColor="text-[#16a34a]"
      />

      <SummaryCard
        title="Inactive Categories"
        value={String(inactive)}
        subtitle="Currently disabled"
        icon={Ban}
        iconBg="bg-[#fee2e2]"
        iconColor="text-[#dc2626]"
      />

      <SummaryCard
        title="Total Items"
        value={String(totalItems)}
        subtitle="Items across categories"
        icon={Boxes}
        iconBg="bg-[#dbeafe]"
        iconColor="text-[#2563eb]"
      />
    </div>
  );
}
