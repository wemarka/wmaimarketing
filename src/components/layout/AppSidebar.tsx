
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
import { useTranslation } from "react-i18next";

const AppSidebar = () => {
  const { signOut } = useAuth();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Navigation items grouped by category
  const mainNavItems = [
    { 
      id: 'dashboard', 
      to: "/dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "لوحة التحكم" : "Dashboard", 
      tooltip: currentLanguage === 'ar' ? "الصفحة الرئيسية" : "Home Page" 
    },
    { 
      id: 'image-upload', 
      to: "/image-upload", 
      icon: <Upload className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "تحليل الصور" : "Image Analysis", 
      tooltip: currentLanguage === 'ar' ? "تحليل صور المنتجات" : "Analyze Product Images" 
    },
    { 
      id: 'ad-generator', 
      to: "/ad-generator", 
      icon: <Image className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "منشئ الإعلانات" : "Ad Generator", 
      tooltip: currentLanguage === 'ar' ? "إنشاء إعلانات جذابة" : "Create Compelling Ads" 
    },
    { 
      id: 'content-creator', 
      to: "/content-creator", 
      icon: <FileText className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "منشئ المحتوى" : "Content Creator", 
      tooltip: currentLanguage === 'ar' ? "إنشاء محتوى متميز" : "Create Outstanding Content" 
    },
  ];

  const mediaNavItems = [
    { 
      id: 'video-generator', 
      to: "/video-generator", 
      icon: <Video className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "منشئ الفيديو" : "Video Generator", 
      tooltip: currentLanguage === 'ar' ? "إنشاء فيديوهات احترافية" : "Create Professional Videos" 
    },
    { 
      id: 'scheduler', 
      to: "/scheduler", 
      icon: <CalendarDays className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "الجدولة والنشر" : "Schedule & Publish", 
      tooltip: currentLanguage === 'ar' ? "جدولة المحتوى ونشره" : "Schedule and Publish Content" 
    },
    { 
      id: 'analytics', 
      to: "/analytics", 
      icon: <BarChart className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "التحليلات" : "Analytics", 
      tooltip: currentLanguage === 'ar' ? "تحليل أداء المحتوى" : "Analyze Content Performance" 
    },
  ];

  const managementNavItems = [
    { 
      id: 'profile', 
      to: "/profile", 
      icon: <User className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "الملف الشخصي" : "Profile", 
      tooltip: currentLanguage === 'ar' ? "إدارة حسابك" : "Manage Your Account" 
    },
    { 
      id: 'users', 
      to: "/users", 
      icon: <Users className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "إدارة المستخدمين" : "User Management", 
      tooltip: currentLanguage === 'ar' ? "إدارة فريق العمل" : "Manage Your Team" 
    },
    { 
      id: 'integration', 
      to: "/integration", 
      icon: <Database className="h-5 w-5" />, 
      label: currentLanguage === 'ar' ? "التكاملات" : "Integrations", 
      tooltip: currentLanguage === 'ar' ? "ربط مع خدمات أخرى" : "Connect with Other Services" 
    },
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
            <SidebarGroupLabel>
              {currentLanguage === 'ar' ? "الرئيسية" : "Main"}
            </SidebarGroupLabel>
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
            <SidebarGroupLabel>
              {currentLanguage === 'ar' ? "الوسائط والتحليلات" : "Media & Analytics"}
            </SidebarGroupLabel>
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
            <SidebarGroupLabel>
              {currentLanguage === 'ar' ? "الإدارة" : "Management"}
            </SidebarGroupLabel>
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
            <SidebarGroupLabel>
              {currentLanguage === 'ar' ? "التوثيق والميزات" : "Documentation & Features"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <NavLink to="/documentation" className="w-full">
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={currentLanguage === 'ar' ? "خطة المشروع والتوثيق" : "Project Plan & Documentation"}
                      >
                        <FileQuestion className="h-5 w-5" />
                        <span className="mr-2">
                          {currentLanguage === 'ar' ? "خطة المشروع" : "Project Plan"}
                        </span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <NavLink to="/ai-studio" className="w-full">
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={currentLanguage === 'ar' ? "استوديو الذكاء الاصطناعي" : "AI Studio"}
                        variant="outline"
                        className="bg-beauty-purple/5 border border-beauty-purple/20"
                      >
                        <Sparkles className="h-5 w-5 text-beauty-gold" />
                        <span className="mr-2 font-medium bg-gradient-to-r from-beauty-gold to-beauty-pink bg-clip-text text-transparent">
                          {currentLanguage === 'ar' ? "استوديو الذكاء الاصطناعي" : "AI Studio"}
                        </span>
                        <Badge className="mr-auto bg-beauty-gold/20 text-beauty-gold hover:bg-beauty-gold/30" variant="outline">
                          {currentLanguage === 'ar' ? "جديد" : "New"}
                        </Badge>
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
            <h5 className="mb-2 text-sm font-medium">
              {currentLanguage === 'ar' ? "مستخدم الإصدار التجريبي" : "Trial User"}
            </h5>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'ar' ? "يمكنك الترقية للوصول إلى جميع الميزات" : "Upgrade to access all features"}
            </p>
            <Button className="mt-3 w-full bg-gradient-to-r from-beauty-pink to-beauty-purple hover:from-beauty-purple hover:to-beauty-pink transition-all duration-300" size="sm">
              {currentLanguage === 'ar' ? "ترقية الآن" : "Upgrade Now"}
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4 ml-2" />
            <span>{currentLanguage === 'ar' ? "تسجيل الخروج" : "Sign Out"}</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
