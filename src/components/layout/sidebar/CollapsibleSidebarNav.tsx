
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Home, 
  LayoutDashboard, 
  BarChart, 
  FileText, 
  Image, 
  Video, 
  Megaphone, 
  Users, 
  Settings, 
  ShieldCheck,
  TrendingUp,
  MessageCircle,
  PieChart,
  Target,
  ChevronDown
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  expanded: boolean;
}

interface SectionItem {
  id: string;
  to: string;
  icon: React.ReactNode;
  label: string;
}

interface NavSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: SectionItem[];
}

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon, 
  label, 
  isActive, 
  expanded
}) => {
  return (
    <motion.a
      href={to}
      className={cn(
        "flex items-center py-2 px-3 rounded-md text-sm transition-colors",
        "hover:bg-white/15",
        isActive 
          ? "bg-white/20 text-white font-medium" 
          : "text-white/80"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="w-5 h-5 mr-3">{icon}</span>
      {expanded && <span>{label}</span>}
    </motion.a>
  );
};

const CollapsibleSidebarNav: React.FC<{ expanded: boolean }> = ({ expanded }) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  // Navigation sections with their sub-items
  const navSections: NavSection[] = [
    {
      id: "home",
      title: "الصفحة الرئيسية",
      icon: <Home className="h-4.5 w-4.5" />,
      items: [
        { id: "main", to: "/", icon: <Home className="h-4 w-4" />, label: "الرئيسية" }
      ]
    },
    {
      id: "dashboard",
      title: "لوحة التحكم",
      icon: <LayoutDashboard className="h-4.5 w-4.5" />,
      items: [
        { id: "overview", to: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" />, label: "النظرة العامة" },
        { id: "performance", to: "/dashboard/performance", icon: <TrendingUp className="h-4 w-4" />, label: "الأداء" },
        { id: "interactions", to: "/dashboard/interactions", icon: <MessageCircle className="h-4 w-4" />, label: "التفاعلات" }
      ]
    },
    {
      id: "marketing",
      title: "التسويق",
      icon: <Target className="h-4.5 w-4.5" />,
      items: [
        { id: "campaigns", to: "/marketing/campaigns", icon: <Megaphone className="h-4 w-4" />, label: "الحملات" },
        { id: "audience", to: "/marketing/audience", icon: <Users className="h-4 w-4" />, label: "الجمهور" },
        { id: "insights", to: "/marketing/insights", icon: <PieChart className="h-4 w-4" />, label: "الإحصاءات" }
      ]
    },
    {
      id: "content",
      title: "المحتوى",
      icon: <FileText className="h-4.5 w-4.5" />,
      items: [
        { id: "posts", to: "/content/posts", icon: <FileText className="h-4 w-4" />, label: "المنشورات" },
        { id: "images", to: "/content/images", icon: <Image className="h-4 w-4" />, label: "الصور" },
        { id: "videos", to: "/content/videos", icon: <Video className="h-4 w-4" />, label: "الفيديوهات" }
      ]
    },
    {
      id: "analytics",
      title: "التحليلات",
      icon: <BarChart className="h-4.5 w-4.5" />,
      items: [
        { id: "weekly", to: "/analytics/weekly", icon: <BarChart className="h-4 w-4" />, label: "التقارير الأسبوعية" },
        { id: "engagement", to: "/analytics/engagement", icon: <TrendingUp className="h-4 w-4" />, label: "التفاعل" },
        { id: "sales", to: "/analytics/sales", icon: <PieChart className="h-4 w-4" />, label: "المبيعات" }
      ]
    },
    {
      id: "admin",
      title: "الإدارة",
      icon: <Settings className="h-4.5 w-4.5" />,
      items: [
        { id: "users", to: "/admin/users", icon: <Users className="h-4 w-4" />, label: "المستخدمين" },
        { id: "roles", to: "/admin/roles", icon: <ShieldCheck className="h-4 w-4" />, label: "الصلاحيات" },
        { id: "settings", to: "/admin/settings", icon: <Settings className="h-4 w-4" />, label: "الإعدادات" }
      ]
    }
  ];

  // Determine which section should be initially expanded based on current route
  const getCurrentSection = () => {
    const path = location.pathname;
    for (const section of navSections) {
      for (const item of section.items) {
        if (path.startsWith(item.to) && item.to !== '/') {
          return section.id;
        }
      }
    }
    return path === '/' ? 'home' : '';
  };

  // Check if a nav item is active
  const isItemActive = (to: string) => {
    if (to === '/' && location.pathname === '/') return true;
    return to !== '/' && location.pathname.startsWith(to);
  };

  const defaultExpandedValue = [getCurrentSection()];

  return (
    <div className={cn(
      "flex flex-col gap-2 overflow-hidden",
      isRTL ? "text-right" : "text-left"
    )}>
      <Accordion 
        type="single" 
        collapsible 
        className="w-full" 
        defaultValue={defaultExpandedValue[0]}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {navSections.map((section) => (
          <AccordionItem 
            key={section.id} 
            value={section.id}
            className="border-none"
          >
            <AccordionTrigger className={cn(
              "py-2 px-3 rounded-md hover:bg-white/15 text-white font-medium",
              "flex items-center justify-between",
              expanded ? "px-4" : "px-2",
              "data-[state=open]:bg-white/20",
              "no-underline"
            )}>
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 bg-white/15 p-2 rounded-md">{section.icon}</span>
                {expanded && <span className="text-sm">{section.title}</span>}
              </div>
              {expanded && <ChevronDown className="h-4 w-4 text-white/70 transition-transform duration-200" />}
            </AccordionTrigger>
            <AccordionContent className={cn(
              "pt-1 pb-0",
              expanded ? "px-2" : "px-0",
            )}>
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-1.5 pl-2"
              >
                {section.items.map((item) => (
                  <NavItem
                    key={item.id}
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                    isActive={isItemActive(item.to)}
                    expanded={expanded}
                  />
                ))}
              </motion.div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CollapsibleSidebarNav;
