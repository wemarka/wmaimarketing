
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Upload, 
  Image, 
  FileText, 
  Video, 
  CalendarDays, 
  BarChart,
  FileQuestion
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return null;
  }
  
  return (
    <div className="hidden lg:flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <NavLink to="/" className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-beauty-pink to-beauty-lightpurple"></div>
          <span className="ml-2 text-xl font-semibold">Beauty AI</span>
        </NavLink>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 p-4">
          <NavItem to="/" icon={<LayoutDashboard className="h-5 w-5" />} text="لوحة التحكم" />
          <NavItem to="/image-upload" icon={<Upload className="h-5 w-5" />} text="تحليل الصور" />
          <NavItem to="/ad-generator" icon={<Image className="h-5 w-5" />} text="منشئ الإعلانات" />
          <NavItem to="/content-creator" icon={<FileText className="h-5 w-5" />} text="منشئ المحتوى" />
          <NavItem to="/video-generator" icon={<Video className="h-5 w-5" />} text="منشئ الفيديو" />
          <NavItem to="/scheduler" icon={<CalendarDays className="h-5 w-5" />} text="الجدولة والنشر" />
          <NavItem to="/analytics" icon={<BarChart className="h-5 w-5" />} text="التحليلات" />
          <NavItem to="/documentation" icon={<FileQuestion className="h-5 w-5" />} text="خطة المشروع" />
        </nav>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="rounded-lg bg-beauty-purple/10 p-4">
          <h5 className="mb-2 text-sm font-medium">مستخدم الإصدار التجريبي</h5>
          <p className="text-xs text-muted-foreground">
            يمكنك الترقية للوصول إلى جميع الميزات
          </p>
          <Button className="mt-3 w-full" size="sm">
            ترقية الآن
          </Button>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const NavItem = ({ to, icon, text }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
        )
      }
    >
      {icon}
      <span className="mr-2">{text}</span>
    </NavLink>
  );
};

export default Sidebar;
