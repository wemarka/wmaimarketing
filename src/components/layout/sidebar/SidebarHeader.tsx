
import React from "react";
import { SidebarHeader as Header } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const SidebarHeader: React.FC = () => {
  const { theme } = useTheme();
  
  // Determine which logo to display based on the current theme
  const logoSrc = theme === "dark" 
    ? "/WM_MARKETING_LOGO_DARK.png" 
    : "/WM_MARKETING_LOGO.png";

  return (
    <Header className="p-4">
      <Link to="/" className="flex items-center justify-center">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={logoSrc}
          alt="WM Marketing"
          className="h-10 w-auto"
        />
      </Link>
    </Header>
  );
};

export default SidebarHeader;
