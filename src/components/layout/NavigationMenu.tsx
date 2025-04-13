
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu as UINavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  LayoutDashboard,
  FileText,
  Image,
  Video,
  CalendarDays,
  BarChart,
  Settings,
  Upload,
  FileQuestion
} from "lucide-react";

const routes = [
  {
    title: "لوحة التحكم",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5 ml-2" />,
  },
  {
    title: "تحليل الصور",
    href: "/image-upload",
    icon: <Upload className="h-5 w-5 ml-2" />,
  },
  {
    title: "منشئ الإعلانات",
    href: "/ad-generator",
    icon: <Image className="h-5 w-5 ml-2" />,
  },
  {
    title: "منشئ المحتوى",
    href: "/content-creator",
    icon: <FileText className="h-5 w-5 ml-2" />,
  },
  {
    title: "منشئ الفيديو",
    href: "/video-generator",
    icon: <Video className="h-5 w-5 ml-2" />,
  },
  {
    title: "الجدولة والنشر",
    href: "/scheduler",
    icon: <CalendarDays className="h-5 w-5 ml-2" />,
  },
  {
    title: "التحليلات",
    href: "/analytics",
    icon: <BarChart className="h-5 w-5 ml-2" />,
  },
  {
    title: "خطة المشروع",
    href: "/documentation",
    icon: <FileQuestion className="h-5 w-5 ml-2" />,
  },
];

const NavigationMenu = () => {
  const location = useLocation();
  
  return (
    <UINavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>الصفحات الرئيسية</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 gap-3 p-4 w-[500px]">
              {routes.map((route) => (
                <NavigationMenuLink
                  key={route.href}
                  asChild
                  className={cn(
                    "flex items-center p-3 hover:bg-accent rounded-md transition-colors",
                    location.pathname === route.href ? "bg-accent text-accent-foreground" : ""
                  )}
                >
                  <NavLink to={route.href}>
                    {route.icon}
                    <span>{route.title}</span>
                  </NavLink>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>أدوات المحتوى</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[400px]">
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  location.pathname === "/content-tools" ? "bg-accent text-accent-foreground" : ""
                )}
              >
                <NavLink to="/content-tools">
                  <FileText className="h-5 w-5 ml-2" />
                  <span>أدوات إنتاج المحتوى البصري</span>
                </NavLink>
              </NavigationMenuLink>
              
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  location.pathname === "/ad-designer" ? "bg-accent text-accent-foreground" : ""
                )}
              >
                <NavLink to="/ad-designer">
                  <Image className="h-5 w-5 ml-2" />
                  <span>مصمم الإعلانات</span>
                </NavLink>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavLink to="/documentation" className={cn(
            navigationMenuTriggerStyle(),
            location.pathname === "/documentation" ? "bg-accent text-accent-foreground" : ""
          )}>
            <FileQuestion className="h-5 w-5 ml-2" />
            <span>خطة المشروع</span>
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </UINavigationMenu>
  );
};

export default NavigationMenu;
