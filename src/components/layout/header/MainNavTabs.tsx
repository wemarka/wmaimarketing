import React from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
}
interface MainNavTabsProps {
  navItems: NavItem[];
}
const MainNavTabs: React.FC<MainNavTabsProps> = ({
  navItems
}) => {
  const location = useLocation();
  return <Tabs defaultValue={location.pathname.includes("/dashboard") ? "dashboard" : location.pathname.includes("/insights") ? "insights" : location.pathname.includes("/channels") ? "channels" : "dashboard"} dir="rtl" className="w-full">
      
    </Tabs>;
};
export default MainNavTabs;