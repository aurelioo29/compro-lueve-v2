import AuthGuard from "@/components/auth-guard";
import DashboardShell from "@/features/dashboard/components/DashboardShell";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  );
}
