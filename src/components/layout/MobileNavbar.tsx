
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Upload,
  Image, 
  FileText, 
  Video, 
  CalendarDays, 
  BarChart,
  Home,
  Menu
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Image Upload",
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
    title: "Publishing",
    href: "/scheduler",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/analytics", 
    icon: <BarChart className="h-5 w-5" />,
  },
];

const MobileNavbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden border-b bg-background">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-beauty-pink to-beauty-lightpurple"></div>
          <span className="ml-2 text-xl font-semibold">Beauty AI</span>
        </Link>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 py-6">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-beauty-pink to-beauty-lightpurple"></div>
                <h3 className="font-semibold text-lg">Beauty AI</h3>
              </div>
              
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors",
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
              
              <div className="mt-auto pb-6 pt-10">
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
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileNavbar;
