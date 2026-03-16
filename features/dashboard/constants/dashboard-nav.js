import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquareMore,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";

export const dashboardNavMain = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: Users,
    permissions: ["user.read"],
  },
  {
    label: "Blogs",
    href: "/dashboard/blogs",
    icon: FileText,
    permissions: ["blog.read"],
  },
  {
    label: "WA Responses",
    href: "/dashboard/wa-responses",
    icon: MessageSquareMore,
    permissions: ["wa_response.read"],
  },
  {
    label: "Activity Logs",
    href: "/dashboard/activity-logs",
    icon: ClipboardList,
    permissions: ["activity_log.read"],
  },
];

export const dashboardNavBottom = [
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    label: "Logout",
    href: "#logout",
    icon: LogOut,
    isLogout: true,
  },
];
