
import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  FileText,
  Image, 
  Video,
  CalendarDays,
  BarChart,
  Settings,
  Users,
  Sparkles,
  MessageSquare
} from "lucide-react";

const AppSidebar = () => {
  const { i18n } = useTranslation();
  const { profile } = useAuth();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  const navigationItems = [
    {
      id: "dashboard",
      label: "لوحة التحكم",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/dashboard"
    },
    {
      id: "content",
      label: "المحتوى",
      icon: <FileText className="h-5 w-5" />,
      href: "/content"
    },
    {
      id: "media",
      label: "الوسائط",
      icon: <Image className="h-5 w-5" />,
      href: "/media"
    },
    {
      id: "schedule",
      label: "الجدولة",
      icon: <CalendarDays className="h-5 w-5" />,
      href: "/schedule"
    },
    {
      id: "analytics",
      label: "التحليلات",
      icon: <BarChart className="h-5 w-5" />,
      href: "/analytics"
    },
    {
      id: "users",
      label: "المستخدمين",
      icon: <Users className="h-5 w-5" />,
      href: "/users",
      role: "admin"
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="h-16 px-4 flex items-center border-b border-white/10">
        <span className="text-xl font-bold text-white">Circle</span>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <a href={item.href} className="flex items-center gap-2 text-white/80 hover:text-white">
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-white/80 hover:text-white">
          <Settings className="h-5 w-5" />
          <span>الإعدادات</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
