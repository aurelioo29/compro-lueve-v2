"use client";

import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <DashboardSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="lg:pl-[270px]">
        <DashboardHeader onOpenSidebar={() => setMobileOpen(true)} />

        <main className="p-4 md:p-10">
          <div className="mx-auto max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
