
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import NavTabItem from "./nav/NavTabItem";
import TabsContainer from "./nav/TabsContainer";

interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface MainNavTabsProps {
  navItems: NavItem[];
}

// This component is now simplified as we're removing the top horizontal tabs
const MainNavTabs: React.FC<MainNavTabsProps> = () => {
  return null; // We're removing this component's visual rendering
};

export default MainNavTabs;
