import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquareMore,
  ClipboardList,
  Settings,
  LogOut,
  FolderKanban,
  Shapes,
  Package,
} from "lucide-react";

export const dashboardNavMain = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Collection",
    href: "/dashboard/collections",
    icon: FolderKanban,
    permissions: ["collection.read"],
    children: [
      {
        label: "Categories",
        href: "/dashboard/collections/categories",
        icon: Shapes,
        permissions: ["collection.read"],
      },
      {
        label: "Items",
        href: "/dashboard/collections/items",
        icon: Package,
        permissions: ["collection.read"],
      },
    ],
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
