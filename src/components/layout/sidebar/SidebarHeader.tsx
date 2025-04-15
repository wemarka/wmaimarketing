import React from "react";
import { SidebarHeader as Header } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const SidebarHeader: React.FC = () => {
  const logoSrc = "/lovable-uploads/cf5262f0-1547-468d-928c-1fa38e243819.png";
  return <Header className="p-4">
      <Link to="/" className="flex items-center justify-center">
        
      </Link>
    </Header>;
};
export default SidebarHeader;