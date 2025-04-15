
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  Search, 
  Moon, 
  Sun, 
  Settings,
  Menu
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { Avatar } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const getPageTitle = (pathname: string) => {
  const paths = {
    "/": "الرئيسية",
    "/dashboard": "لوحة التحكم",
    "/analytics": "التحليلات",
    "/content-tools": "أدوات المحتوى",
    "/ai-studio": "استوديو الذكاء الاصطناعي",
    "/scheduler": "جدولة المنشورات",
    "/user-management": "إدارة المستخدمين",
    "/profile": "الملف الشخصي",
  };
  
  return paths[pathname as keyof typeof paths] || "بيوتي";
};

const Header: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationCount, setNotificationCount] = useState(4);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  // مراقبة حركة التمرير لإخفاء/إظهار الهيدر
  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(st <= lastScrollTop || st < 50);
      setLastScrollTop(st <= 0 ? 0 : st);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  // التعامل مع البحث
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "جاري البحث",
        description: `تبحث عن: ${searchQuery}`,
      });
    }
  };

  // التعامل مع تبديل السمة
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast({
      title: "تم تغيير السمة",
      description: `تم التبديل إلى الوضع ${theme === "dark" ? "الفاتح" : "الداكن"}`,
    });
  };

  // التعامل مع الإشعارات
  const handleNotificationClick = () => {
    setNotificationCount(0);
  };

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: isVisible ? 0 : -80, 
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">تبديل القائمة</span>
            </Button>
          </SidebarTrigger>
          
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold">{getPageTitle(location.pathname)}</h1>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* نموذج البحث */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Input 
              placeholder="بحث سريع..."
              className="w-[200px] lg:w-[300px] h-9 pl-9 rounded-full bg-muted/30 border-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </form>
          
          {/* زر تبديل السمة */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full h-9 w-9"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" />
            )}
          </Button>
          
          {/* زر الإشعارات */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-[10px] bg-red-500"
                    variant="destructive"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-0" align="end">
              <div className="p-4 border-b">
                <h3 className="font-medium text-lg">الإشعارات</h3>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                <div className="p-3 border-b hover:bg-muted/40 cursor-pointer" onClick={handleNotificationClick}>
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-1 bg-purple-100 text-purple-700 border-0">تسويق</Badge>
                    <div>
                      <p className="text-sm font-medium">إحصائيات الحملة الأخيرة جاهزة</p>
                      <p className="text-xs text-muted-foreground">منذ ٢٠ دقيقة</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-b hover:bg-muted/40 cursor-pointer" onClick={handleNotificationClick}>
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-700 border-0">تعليق</Badge>
                    <div>
                      <p className="text-sm font-medium">علق شخص ما على منشورك "أفضل منتجات العناية للبشرة"</p>
                      <p className="text-xs text-muted-foreground">منذ ساعتين</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-b hover:bg-muted/40 cursor-pointer" onClick={handleNotificationClick}>
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700 border-0">نشر</Badge>
                    <div>
                      <p className="text-sm font-medium">تم نشر المحتوى المجدول بنجاح</p>
                      <p className="text-xs text-muted-foreground">منذ ٥ ساعات</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 flex justify-center border-t">
                <Button variant="link" size="sm" className="text-xs">
                  عرض كل الإشعارات
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* قائمة المستخدم */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 pl-2">
                <Avatar className="h-8 w-8">
                  <div className="bg-primary/20 text-primary flex h-full w-full items-center justify-center rounded-full">
                    {user?.email?.charAt(0).toUpperCase() || 'ب'}
                  </div>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">
                    {user?.email?.split('@')[0] || 'بيوتي'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    مدير
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2 border-b text-center">
                <p className="text-sm font-medium">{user?.email}</p>
                <p className="text-xs text-muted-foreground">حساب مديرة</p>
              </div>
              <DropdownMenuItem asChild>
                <a href="/profile" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>الإعدادات</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={() => logout && logout()}>
                تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
