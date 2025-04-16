
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, LayoutDashboard, MessageSquare, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const MobileNavbar: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const navItems = [
    {
      path: "/",
      label: t("nav.home", "الرئيسية"),
      icon: <Home className="w-5 h-5" />
    },
    {
      path: "/dashboard",
      label: t("nav.dashboard", "لوحة التحكم"),
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      path: "/messages",
      label: t("nav.messages", "الرسائل"),
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      path: "/profile",
      label: t("nav.profile", "الملف الشخصي"),
      icon: <User className="w-5 h-5" />
    },
    {
      path: "/settings",
      label: t("nav.settings", "الإعدادات"),
      icon: <Settings className="w-5 h-5" />
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#3a7a89] pb-safe">
      <motion.nav 
        className="flex justify-around p-2 border-t border-white/10"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path !== "/" && location.pathname.startsWith(item.path));
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex flex-col items-center justify-center px-2 py-1 rounded-md relative",
                isActive ? "text-white" : "text-white/60"
              )}
            >
              {({ isActive }) => (
                <>
                  {item.icon}
                  <span className="text-xs mt-1">{item.label}</span>
                  
                  {isActive && (
                    <motion.div 
                      className="absolute -top-1 w-1 h-1 bg-white rounded-full"
                      layoutId="navIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default MobileNavbar;
