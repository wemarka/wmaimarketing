
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Album,
  BarChart3,
  CalendarRange,
  Clapperboard,
  FileStack,
  Laptop2,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Settings2,
  Sparkles,
  Users,
} from "lucide-react";

export default function NavMenu() {
  return (
    <NavigationMenu dir="rtl" className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/dashboard">
            <NavigationMenuLink className={navigationMenuTriggerStyle()} dir="rtl">
              <LayoutDashboard className="h-4 w-4 ml-2" />
              <span>الرئيسية</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Clapperboard className="h-4 w-4 ml-2" />
            <span>المحتوى</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <ListItem
                to="/content-creator"
                title="إنشاء محتوى"
                icon={<MessageSquare className="h-4 w-4 ml-2" />}
              >
                تصميم وإنشاء محتوى التسويق للمنصات المختلفة
              </ListItem>
              <ListItem
                to="/content-tools"
                title="أدوات المحتوى"
                icon={<FileStack className="h-4 w-4 ml-2" />}
              >
                أدوات متنوعة لإدارة وتنظيم الصور ومصطلحات المنتجات
              </ListItem>
              <ListItem
                to="/image-upload"
                title="رفع الصور"
                icon={<Album className="h-4 w-4 ml-2" />}
              >
                رفع وإدارة صور المنتجات وأصول التسويق
              </ListItem>
              <ListItem
                to="/video-generator"
                title="إنشاء الفيديوهات"
                icon={<Clapperboard className="h-4 w-4 ml-2" />}
              >
                إنشاء فيديوهات تسويقية جذابة باستخدام الذكاء الاصطناعي
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <BarChart3 className="h-4 w-4 ml-2" />
            <span>التحليلات والنشر</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <ListItem
                to="/analytics"
                title="التحليلات والتقارير"
                icon={<BarChart3 className="h-4 w-4 ml-2" />}
              >
                تحليل أداء الحملات التسويقية والتقارير التفصيلية
              </ListItem>
              <ListItem
                to="/scheduler"
                title="جدولة ونشر المحتوى"
                icon={<CalendarRange className="h-4 w-4 ml-2" />}
              >
                جدولة ونشر المحتوى على منصات التواصل الاجتماعي
              </ListItem>
              <ListItem
                to="/scheduler-settings"
                title="إعدادات النشر"
                icon={<Settings className="h-4 w-4 ml-2" />}
              >
                تكوين إعدادات النشر والجدولة للمحتوى
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Settings2 className="h-4 w-4 ml-2" />
            <span>الإدارة</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <ListItem
                to="/users"
                title="إدارة المستخدمين"
                icon={<Users className="h-4 w-4 ml-2" />}
              >
                إدارة صلاحيات وأدوار المستخدمين في النظام
              </ListItem>
              <ListItem
                to="/integration"
                title="التكامل والواجهات"
                icon={<Laptop2 className="h-4 w-4 ml-2" />}
              >
                إعدادات التكامل مع الأنظمة الخارجية
              </ListItem>
              <ListItem
                to="/documentation"
                title="التوثيق والمساعدة"
                icon={<FileStack className="h-4 w-4 ml-2" />}
              >
                توثيق المشروع ومراحله والمساعدة
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/ai-studio">
            <NavigationMenuLink className={navigationMenuTriggerStyle()} dir="rtl">
              <Sparkles className="h-4 w-4 ml-2 text-beauty-gold" />
              <span>استوديو الذكاء الاصطناعي</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface ListItemProps {
  to: string;
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const ListItem = ({ to, title, icon, children }: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          )}
          dir="rtl"
        >
          <div className="flex items-center mb-2">
            {icon}
            <span className="text-sm font-medium leading-none">{title}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
