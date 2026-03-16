"use client";

import { Activity, Clock3, LogIn, ShieldAlert } from "lucide-react";

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

export default function ActivityLogsSummaryCards({
  totalLogs = 0,
  currentPage = 1,
  totalPages = 1,
  loginLogsCount = 0,
  criticalLogsCount = 0,
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Logs"
        value={String(totalLogs)}
        subtitle="All recorded activities"
        icon={Activity}
        iconBg="bg-[#ede9fe]"
        iconColor="text-[#7c3aed]"
      />

      <SummaryCard
        title="Current Page"
        value={String(currentPage)}
        subtitle={`Page ${currentPage} of ${totalPages}`}
        icon={Clock3}
        iconBg="bg-[#dbeafe]"
        iconColor="text-[#2563eb]"
      />

      <SummaryCard
        title="Login Actions"
        value={String(loginLogsCount)}
        subtitle="Authentication log entries"
        icon={LogIn}
        iconBg="bg-[#dcfce7]"
        iconColor="text-[#16a34a]"
      />

      <SummaryCard
        title="Critical Logs"
        value={String(criticalLogsCount)}
        subtitle="Delete or destructive actions"
        icon={ShieldAlert}
        iconBg="bg-[#fee2e2]"
        iconColor="text-[#dc2626]"
      />
    </div>
  );
}
