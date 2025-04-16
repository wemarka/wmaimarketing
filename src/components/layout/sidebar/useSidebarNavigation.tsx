
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";

export const useSidebarNavigation = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Auto collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [isMobile]);
  
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
    
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
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
    location
  };
};
