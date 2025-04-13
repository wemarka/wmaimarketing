
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
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

const MobileNavbar = () => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background lg:hidden">
      <ScrollArea className="w-full">
        <nav className="flex h-14 items-center justify-between px-4">
          <NavItem to="/" icon={<LayoutDashboard className="h-5 w-5" />} />
          <NavItem to="/image-upload" icon={<Upload className="h-5 w-5" />} />
          <NavItem to="/ad-generator" icon={<Image className="h-5 w-5" />} />
          <NavItem to="/content-creator" icon={<FileText className="h-5 w-5" />} />
          <NavItem to="/video-generator" icon={<Video className="h-5 w-5" />} />
          <NavItem to="/scheduler" icon={<CalendarDays className="h-5 w-5" />} />
          <NavItem to="/analytics" icon={<BarChart className="h-5 w-5" />} />
          <NavItem to="/documentation" icon={<FileQuestion className="h-5 w-5" />} />
        </nav>
      </ScrollArea>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
}

const NavItem = ({ to, icon }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex h-10 w-10 items-center justify-center rounded-md",
          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )
      }
    >
      {icon}
    </NavLink>
  );
};

export default MobileNavbar;
