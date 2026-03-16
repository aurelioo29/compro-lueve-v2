"use client";

import {
  UsersRound,
  Package,
  BadgeDollarSign,
  RotateCcw,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const statCards = [
  {
    title: "Total User",
    value: "40,689",
    change: "8.5% Up from yesterday",
    positive: true,
    icon: UsersRound,
    iconBg: "bg-[#ede9fe]",
    iconColor: "text-[#8b5cf6]",
  },
  {
    title: "Total Order",
    value: "10293",
    change: "1.3% Up from past week",
    positive: true,
    icon: Package,
    iconBg: "bg-[#fef3c7]",
    iconColor: "text-[#f59e0b]",
  },
  {
    title: "Total Sales",
    value: "$89,000",
    change: "4.3% Down from yesterday",
    positive: false,
    icon: BadgeDollarSign,
    iconBg: "bg-[#dcfce7]",
    iconColor: "text-[#22c55e]",
  },
  {
    title: "Total Pending",
    value: "2040",
    change: "1.8% Up from yesterday",
    positive: true,
    icon: RotateCcw,
    iconBg: "bg-[#ffedd5]",
    iconColor: "text-[#f97316]",
  },
];

const dealRows = [
  {
    product: "Apple Watch",
    location: "6096 Marjolaine Landing",
    date: "12.09.2026 - 12.53 PM",
    piece: "423",
    amount: "$34,295",
    status: "Delivered",
  },
  {
    product: "MacBook Pro",
    location: "Berlin, Germany",
    date: "14.09.2026 - 10.15 AM",
    piece: "120",
    amount: "$18,540",
    status: "Pending",
  },
  {
    product: "iPhone 15",
    location: "Jakarta, Indonesia",
    date: "15.09.2026 - 03.40 PM",
    piece: "220",
    amount: "$27,840",
    status: "Delivered",
  },
];

function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  iconBg,
  iconColor,
}) {
  return (
    <div className="rounded-[22px] bg-white p-5 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#6b7280]">{title}</p>
          <h3 className="mt-3 text-[22px] font-bold tracking-[-0.02em] text-[#111827]">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <Icon size={26} className={iconColor} />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm">
        {positive ? (
          <TrendingUp size={16} className="text-[#10b981]" />
        ) : (
          <TrendingDown size={16} className="text-[#f43f5e]" />
        )}

        <span
          className={
            positive
              ? "font-semibold text-[#10b981]"
              : "font-semibold text-[#f43f5e]"
          }
        >
          {change.split(" ")[0]}
        </span>

        <span className="text-[#6b7280]">
          {change.replace(change.split(" ")[0], "").trim()}
        </span>
      </div>
    </div>
  );
}

function SalesChartPlaceholder() {
  const bars = [32, 46, 40, 52, 34, 60, 44, 56, 39, 67, 49, 58];

  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-[20px] font-bold text-[#111827]">Sales Details</h3>

        <button className="rounded-lg border border-[#e5e7eb] px-4 py-2 text-sm text-[#6b7280]">
          October
        </button>
      </div>

      <div className="flex h-[320px] items-end gap-3 rounded-2xl bg-[#fafbfc] p-6">
        {bars.map((height, index) => (
          <div key={index} className="flex flex-1 flex-col justify-end">
            <div
              className="rounded-t-xl bg-[#4f7df3]/85"
              style={{ height: `${height * 3.8}px` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DealsTable() {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-[20px] font-bold text-[#111827]">Deals Details</h3>

        <button className="rounded-lg border border-[#e5e7eb] px-4 py-2 text-sm text-[#6b7280]">
          October
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left">
              {[
                "Product Name",
                "Location",
                "Date - Time",
                "Piece",
                "Amount",
                "Status",
              ].map((head) => (
                <th
                  key={head}
                  className="bg-[#f3f5f9] px-6 py-4 text-sm font-semibold text-[#374151] first:rounded-l-2xl last:rounded-r-2xl"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {dealRows.map((row, index) => (
              <tr key={index} className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-[#111827]">
                  {row.product}
                </td>
                <td className="px-6 py-4 text-sm text-[#6b7280]">
                  {row.location}
                </td>
                <td className="px-6 py-4 text-sm text-[#6b7280]">{row.date}</td>
                <td className="px-6 py-4 text-sm text-[#6b7280]">
                  {row.piece}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#111827]">
                  {row.amount}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-xs font-semibold ${
                      row.status === "Delivered"
                        ? "bg-[#dcfce7] text-[#16a34a]"
                        : "bg-[#fef3c7] text-[#d97706]"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-[38px] font-bold tracking-[-0.03em] text-[#111827]">
          Dashboard
        </h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <SalesChartPlaceholder />

      <DealsTable />
    </section>
  );
}
