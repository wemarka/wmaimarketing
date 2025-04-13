
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Upload,
  Image, 
  FileText, 
  Video, 
  CalendarDays, 
  BarChart,
  Home
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Image Upload & Analysis",
    href: "/image-upload",
    icon: <Upload className="h-5 w-5" />,
  },
  {
    title: "Ad Generator",
    href: "/ad-generator",
    icon: <Image className="h-5 w-5" />,
  },
  {
    title: "Content Creator",
    href: "/content-creator",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Video Generator",
    href: "/video-generator",
    icon: <Video className="h-5 w-5" />,
  },
  {
    title: "Publishing & Scheduler",
    href: "/scheduler",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/analytics", 
    icon: <BarChart className="h-5 w-5" />,
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex flex-col h-screen w-64 border-r bg-background">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-10">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-beauty-pink to-beauty-lightpurple"></div>
          <h3 className="font-semibold text-lg">Beauty AI</h3>
        </div>
        
        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-muted"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6">
        <div className="rounded-lg bg-muted p-4">
          <h4 className="font-medium mb-1">Upgrade to Pro</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Get access to advanced AI features
          </p>
          <Button className="w-full" size="sm">
            Upgrade now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
