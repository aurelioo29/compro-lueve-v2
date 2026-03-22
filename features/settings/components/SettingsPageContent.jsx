"use client";

import SettingsHeader from "./SettingsHeader";
import SettingsInfoCard from "./SettingsInfoCard";
import SettingsProfileCard from "./SettingsProfileCard";
import SettingsPasswordCard from "./SettingsPasswordCard";
import { useProfile } from "../hooks/useProfile";

function LoadingCard() {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-40 rounded-lg bg-[#eef2f7]" />
        <div className="h-12 w-full rounded-xl bg-[#eef2f7]" />
        <div className="h-12 w-full rounded-xl bg-[#eef2f7]" />
        <div className="ml-auto h-11 w-32 rounded-xl bg-[#eef2f7]" />
      </div>
    </div>
  );
}

function ErrorCard({ message, onRetry }) {
  return (
    <div className="rounded-[24px] border border-[#fecaca] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <h3 className="text-lg font-bold text-[#111827]">
        Failed to load settings
      </h3>
      <p className="mt-2 text-sm text-[#6b7280]">
        {message || "Something went wrong while loading profile data."}
      </p>
      <button
        onClick={onRetry}
        className="mt-4 inline-flex h-[42px] items-center rounded-xl border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#374151] transition hover:bg-[#f9fafb]"
      >
        Retry
      </button>
    </div>
  );
}

export default function SettingsPageContent() {
  const { data, isLoading, isError, error, refetch, isFetching } = useProfile();

  const profile = data?.data || null;

  return (
    <section className="space-y-6">
      <SettingsHeader onRefresh={refetch} isRefreshing={isFetching} />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SettingsInfoCard
          title="Account Name"
          value={profile?.name || "-"}
          helper="Your current display name"
        />
        <SettingsInfoCard
          title="Email Address"
          value={profile?.email || "-"}
          helper="Primary account email"
          valueClassName="break-all text-[18px]"
        />
        <SettingsInfoCard
          title="Status"
          value={profile?.isActive ? "Active" : "Inactive"}
          helper="Account availability"
          valueClassName={
            profile?.isActive ? "text-[#16a34a]" : "text-[#dc2626]"
          }
        />
        <SettingsInfoCard
          title="Role"
          value={profile?.role || "-"}
          helper="Assigned system role"
        />
      </div>

      {isLoading ? (
        <>
          <LoadingCard />
          <LoadingCard />
        </>
      ) : isError ? (
        <ErrorCard message={error?.response?.data?.message} onRetry={refetch} />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SettingsProfileCard profile={profile} />
          <SettingsPasswordCard />
        </div>
      )}
    </section>
  );
}
