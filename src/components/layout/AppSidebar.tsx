
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Upload, 
  Image, 
  FileText, 
  Video, 
  CalendarDays, 
  BarChart,
  FileQuestion,
  User,
  Users,
  Database,
  Sparkles,
  LogOut,
  Crown
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const { signOut } = useAuth();

  // Navigation items grouped by category
  const mainNavItems = [
    { id: 'dashboard', to: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" />, label: "لوحة التحكم", tooltip: "الصفحة الرئيسية" },
    { id: 'image-upload', to: "/image-upload", icon: <Upload className="h-5 w-5" />, label: "تحليل الصور", tooltip: "تحليل صور المنتجات" },
    { id: 'ad-generator', to: "/ad-generator", icon: <Image className="h-5 w-5" />, label: "منشئ الإعلانات", tooltip: "إنشاء إعلانات جذابة" },
    { id: 'content-creator', to: "/content-creator", icon: <FileText className="h-5 w-5" />, label: "منشئ المحتوى", tooltip: "إنشاء محتوى متميز" },
  ];

  const mediaNavItems = [
    { id: 'video-generator', to: "/video-generator", icon: <Video className="h-5 w-5" />, label: "منشئ الفيديو", tooltip: "إنشاء فيديوهات احترافية" },
    { id: 'scheduler', to: "/scheduler", icon: <CalendarDays className="h-5 w-5" />, label: "الجدولة والنشر", tooltip: "جدولة المحتوى ونشره" },
    { id: 'analytics', to: "/analytics", icon: <BarChart className="h-5 w-5" />, label: "التحليلات", tooltip: "تحليل أداء المحتوى" },
  ];

  const managementNavItems = [
    { id: 'profile', to: "/profile", icon: <User className="h-5 w-5" />, label: "الملف الشخصي", tooltip: "إدارة حسابك" },
    { id: 'users', to: "/users", icon: <Users className="h-5 w-5" />, label: "إدارة المستخدمين", tooltip: "إدارة فريق العمل" },
    { id: 'integration', to: "/integration", icon: <Database className="h-5 w-5" />, label: "التكاملات", tooltip: "ربط مع خدمات أخرى" },
  ];

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="flex h-14 items-center px-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-beauty-pink to-beauty-lightpurple flex items-center justify-center">
            <Crown className="h-4 w-4 text-white" />
          </div>
          <span className="mr-2 text-xl font-semibold">Beauty AI</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <ScrollArea>
          <SidebarGroup>
            <SidebarGroupLabel>الرئيسية</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <NavLink to={item.to} className="w-full">
                      {({ isActive }) => (
                        <SidebarMenuButton
                          isActive={isActive}
                          tooltip={item.tooltip}
                        >
                          <span className={cn(
                            "transition-all",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )}>{item.icon}</span>
                          <span className="mr-2">{item.label}</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />
          
          <SidebarGroup>
            <SidebarGroupLabel>الوسائط والتحليلات</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mediaNavItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <NavLink to={item.to} className="w-full">
                      {({ isActive }) => (
                        <SidebarMenuButton
                          isActive={isActive}
                          tooltip={item.tooltip}
                        >
                          <span className={cn(
                            "transition-all",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )}>{item.icon}</span>
                          <span className="mr-2">{item.label}</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />
          
          <SidebarGroup>
            <SidebarGroupLabel>الإدارة</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {managementNavItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <NavLink to={item.to} className="w-full">
                      {({ isActive }) => (
                        <SidebarMenuButton
                          isActive={isActive}
                          tooltip={item.tooltip}
                        >
                          <span className={cn(
                            "transition-all",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )}>{item.icon}</span>
                          <span className="mr-2">{item.label}</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />
          
          <SidebarGroup>
            <SidebarGroupLabel>التوثيق والميزات</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <NavLink to="/documentation" className="w-full">
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip="خطة المشروع والتوثيق"
                      >
                        <FileQuestion className="h-5 w-5" />
                        <span className="mr-2">خطة المشروع</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <NavLink to="/ai-studio" className="w-full">
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip="استوديو الذكاء الاصطناعي"
                        variant="outline"
                        className="bg-beauty-purple/5 border border-beauty-purple/20"
                      >
                        <Sparkles className="h-5 w-5 text-beauty-gold" />
                        <span className="mr-2 font-medium bg-gradient-to-r from-beauty-gold to-beauty-pink bg-clip-text text-transparent">استوديو الذكاء الاصطناعي</span>
                        <Badge className="mr-auto bg-beauty-gold/20 text-beauty-gold hover:bg-beauty-gold/30" variant="outline">جديد</Badge>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4 border-t">
          <div className="rounded-lg bg-card p-4 border border-border/40 shadow-sm mb-4">
            <h5 className="mb-2 text-sm font-medium">مستخدم الإصدار التجريبي</h5>
            <p className="text-xs text-muted-foreground">
              يمكنك الترقية للوصول إلى جميع الميزات
            </p>
            <Button className="mt-3 w-full bg-gradient-to-r from-beauty-pink to-beauty-purple hover:from-beauty-purple hover:to-beauty-pink transition-all duration-300" size="sm">
              ترقية الآن
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4 ml-2" />
            <span>تسجيل الخروج</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
