"use client";

export default function SettingsInfoCard({
  title,
  value,
  helper,
  valueClassName = "",
}) {
  return (
    <div className="rounded-[22px] bg-white p-5 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <p className="text-sm font-medium text-[#6b7280]">{title}</p>
      <h3
        className={`mt-3 text-[22px] font-bold tracking-[-0.02em] text-[#111827] ${valueClassName}`}
      >
        {value}
      </h3>
      <p className="mt-2 text-sm text-[#9ca3af]">{helper}</p>
    </div>
  );
}
