"use client";

import { BadgeCheck, Image as ImageIcon, ListTree, Rows3 } from "lucide-react";

function StatCard({ title, value, subtitle, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="rounded-[22px] bg-white p-5 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#6b7280]">{title}</p>
          <h3 className="mt-3 break-words text-[24px] font-bold tracking-[-0.02em] text-[#111827]">
            {value}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#9ca3af]">{subtitle}</p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <Icon size={20} className={iconColor} />
        </div>
      </div>
    </div>
  );
}

export default function CollectionItemBuilderStats({
  totalImages = 0,
  totalSections = 0,
  totalDetailItems = 0,
  status = "-",
  compact = false,
}) {
  return (
    <div
      className={
        compact
          ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2"
          : "grid gap-5 md:grid-cols-2 xl:grid-cols-4"
      }
    >
      <StatCard
        title="Total Images"
        value={String(totalImages)}
        subtitle="Primary, gallery, and bottom"
        icon={ImageIcon}
        iconBg="bg-[#ede9fe]"
        iconColor="text-[#7c3aed]"
      />

      <StatCard
        title="Sections"
        value={String(totalSections)}
        subtitle="Structured detail groups"
        icon={Rows3}
        iconBg="bg-[#dbeafe]"
        iconColor="text-[#2563eb]"
      />

      <StatCard
        title="Detail Rows"
        value={String(totalDetailItems)}
        subtitle="Label-value specifications"
        icon={ListTree}
        iconBg="bg-[#fef3c7]"
        iconColor="text-[#b45309]"
      />

      <StatCard
        title="Status"
        value={String(status || "-")}
        subtitle="Current publish state"
        icon={BadgeCheck}
        iconBg="bg-[#dcfce7]"
        iconColor="text-[#16a34a]"
      />
    </div>
  );
}
