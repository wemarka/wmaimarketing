
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useSidebarNavigation = () => {
  const { i18n } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState<"right" | "left">("right");
  
  // Auto collapse sidebar on mobile and tablet
  useEffect(() => {
    if (isMobile || isTablet) {
      setExpanded(false);
    } else {
      // On desktop, retrieve from localStorage if available
      const savedState = localStorage.getItem("sidebar-expanded");
      if (savedState !== null) {
        setExpanded(savedState === "true");
      } else {
        setExpanded(true); // Default to expanded on desktop
      }
    }
  }, [isMobile, isTablet]);
  
  // Check if dark mode is already active and sync with system preference
  useEffect(() => {
    // Check localStorage first
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial dark mode state based on localStorage or system preference
    const shouldEnableDark = 
      storedTheme === "dark" || 
      (!storedTheme && prefersDark);
    
    setIsDarkMode(shouldEnableDark);
    document.documentElement.classList.toggle('dark', shouldEnableDark);
    
    // Listen for system preference changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if there's no user preference stored
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(e.matches);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };
    
    darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // Set sidebar position based on language direction
    updateSidebarPosition();
    
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Auto-collapse sidebar on route changes on mobile devices
  useEffect(() => {
    if (isMobile) {
      setExpanded(false);
    }
  }, [location.pathname, isMobile]);

  // Update sidebar position when language changes
  useEffect(() => {
    updateSidebarPosition();
  }, [i18n.language]);
  
  // Extract the sidebar position update logic to avoid duplication
  const updateSidebarPosition = useCallback(() => {
    const isRTL = i18n.language === "ar" || document.dir === "rtl";
    setSidebarPosition(isRTL ? "right" : "left");
  }, [i18n.language]);

  const toggleExpanded = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    
    // Save preference to localStorage
    localStorage.setItem("sidebar-expanded", String(newExpanded));
    
    // Show toast on mobile
    if (isMobile) {
      toast.success(
        newExpanded ? 'تم فتح القائمة الجانبية' : 'تم طي القائمة الجانبية',
        { duration: 1500 }
      );
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
    toast.success(
      newDarkMode ? 'تم تفعيل الوضع الداكن' : 'تم تفعيل الوضع الفاتح', 
      { duration: 2000 }
    );
  };
  
  // Helper function to check if a route is active
  const checkIsActive = (path: string): boolean => {
    // Exact match for root and dashboard
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    
    // For other routes, check if current path starts with the given path
    return path !== '/' && path !== '/dashboard' && location.pathname.startsWith(path);
  };

  return {
    expanded,
    toggleExpanded,
    isDarkMode,
    toggleDarkMode,
    checkIsActive,
    location,
    sidebarPosition,
    isMobile
  };
};
