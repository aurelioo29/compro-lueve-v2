"use client";

import {
  MessageSquareMore,
  Clock3,
  CheckCircle2,
  FolderCheck,
} from "lucide-react";

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

export default function WaResponsesSummaryCards({
  total = 0,
  pending = 0,
  responded = 0,
  closed = 0,
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Responses"
        value={String(total)}
        subtitle="All incoming submissions"
        icon={MessageSquareMore}
        iconBg="bg-[#ede9fe]"
        iconColor="text-[#7c3aed]"
      />

      <SummaryCard
        title="Pending"
        value={String(pending)}
        subtitle="Waiting for follow-up"
        icon={Clock3}
        iconBg="bg-[#fef3c7]"
        iconColor="text-[#d97706]"
      />

      <SummaryCard
        title="Responded"
        value={String(responded)}
        subtitle="Already contacted"
        icon={CheckCircle2}
        iconBg="bg-[#dcfce7]"
        iconColor="text-[#16a34a]"
      />

      <SummaryCard
        title="Closed"
        value={String(closed)}
        subtitle="Completed or archived"
        icon={FolderCheck}
        iconBg="bg-[#dbeafe]"
        iconColor="text-[#2563eb]"
      />
    </div>
  );
}
