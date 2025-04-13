
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  Video, 
  CalendarDays, 
  BarChart,
  User,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";

const MobileNavbar = () => {
  const isMobile = useIsMobile();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  if (!isMobile) {
    return null;
  }

  const navItems = [
    { 
      to: "/dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "الرئيسية" : "Home" 
    },
    { 
      to: "/image-upload", 
      icon: <Upload className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "الصور" : "Images" 
    },
    { 
      to: "/ad-generator", 
      icon: <ImageIcon className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "الإعلانات" : "Ads" 
    },
    { 
      to: "/content-creator", 
      icon: <FileText className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "المحتوى" : "Content" 
    },
    { 
      to: "/video-generator", 
      icon: <Video className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "الفيديو" : "Video" 
    },
    { 
      to: "/scheduler", 
      icon: <CalendarDays className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "الجدولة" : "Schedule" 
    },
    { 
      to: "/analytics", 
      icon: <BarChart className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "التحليلات" : "Analytics" 
    },
    { 
      to: "/ai-studio", 
      icon: <Sparkles className="h-5 w-5 text-beauty-gold" />, 
      label: currentLanguage === 'ar' ? "الذكاء" : "AI" 
    },
    { 
      to: "/profile", 
      icon: <User className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "الملف" : "Profile" 
    },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/90 backdrop-blur-sm lg:hidden">
      <ScrollArea className="w-full" scrollHideDelay={0}>
        <nav className="flex h-16 items-center justify-between px-2">
          {navItems.map((item, index) => (
            <NavItem 
              key={index}
              to={item.to} 
              icon={item.icon} 
              label={item.label}
            />
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center px-3 py-1 rounded-md transition-colors",
          isActive 
            ? "bg-secondary text-primary" 
            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
        )
      }
    >
      <div className="flex h-8 w-8 items-center justify-center">
        {icon}
      </div>
      <span className="text-xs">{label}</span>
    </NavLink>
  );
};

export default MobileNavbar;
