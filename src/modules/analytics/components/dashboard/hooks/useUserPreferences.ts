
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// أنواع تخصيص واجهة المستخدم
export type ThemePreference = "system" | "light" | "dark";
export type ChartType = "line" | "bar" | "area" | "pie";
export type ColorScheme = "default" | "blue" | "green" | "purple" | "amber";
export type DashboardLayout = "default" | "compact" | "expanded";

export interface UserPreferences {
  theme: ThemePreference;
  chartType: ChartType;
  colorScheme: ColorScheme;
  dashboardLayout: DashboardLayout;
  showGridLines: boolean;
  enableAnimations: boolean;
}

const defaultPreferences: UserPreferences = {
  theme: "system",
  chartType: "line",
  colorScheme: "default",
  dashboardLayout: "default",
  showGridLines: true,
  enableAnimations: true,
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const { toast } = useToast();
  
  // تحميل التفضيلات من التخزين المحلي عند تهيئة المكون
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem("userPreferences");
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    } catch (error) {
      console.error("فشل في تحميل تفضيلات المستخدم:", error);
    }
  }, []);
  
  // حفظ التفضيلات في التخزين المحلي عند تغييرها
  const updatePreference = <K extends keyof UserPreferences>(
    key: K, 
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => {
      const newPreferences = { ...prev, [key]: value };
      try {
        localStorage.setItem("userPreferences", JSON.stringify(newPreferences));
      } catch (error) {
        console.error("فشل في حفظ تفضيلات المستخدم:", error);
      }
      return newPreferences;
    });
    
    toast({
      title: "تم حفظ التفضيلات",
      description: "تم تحديث إعدادات واجهة المستخدم الخاصة بك",
    });
  };
  
  // إعادة تعيين التفضيلات إلى القيم الافتراضية
  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    try {
      localStorage.setItem("userPreferences", JSON.stringify(defaultPreferences));
      
      toast({
        title: "تم إعادة التعيين",
        description: "تم إعادة تعيين كافة التفضيلات إلى القيم الافتراضية",
      });
    } catch (error) {
      console.error("فشل في إعادة تعيين تفضيلات المستخدم:", error);
    }
  };
  
  // تطبيق سمة UI استنادًا إلى التفضيلات
  useEffect(() => {
    // تطبيق مخطط الألوان
    document.documentElement.setAttribute("data-color-scheme", preferences.colorScheme);
    
    // تطبيق تنسيق لوحة القيادة
    document.documentElement.setAttribute("data-dashboard-layout", preferences.dashboardLayout);
    
    // تطبيق إعدادات الرسوم البيانية
    if (preferences.showGridLines) {
      document.documentElement.classList.add("show-grid-lines");
    } else {
      document.documentElement.classList.remove("show-grid-lines");
    }
    
    if (preferences.enableAnimations) {
      document.documentElement.classList.add("enable-animations");
    } else {
      document.documentElement.classList.remove("enable-animations");
    }
  }, [preferences]);
  
  return {
    preferences,
    updatePreference,
    resetPreferences,
  };
}
