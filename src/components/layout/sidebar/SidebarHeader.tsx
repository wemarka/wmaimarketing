
import React from "react";
import { SidebarHeader as Header } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SidebarHeader: React.FC = () => {
  const logoSrc = "/lovable-uploads/cf5262f0-1547-468d-928c-1fa38e243819.png";

  return (
    <Header className="p-4">
      <Link to="/" className="flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <img 
            src={logoSrc} 
            alt="بيوتي منصة التسويق الذكية" 
            className="h-auto w-full max-w-[140px] mx-auto object-contain"
          />
        </motion.div>
      </Link>
    </Header>
  );
};

export default SidebarHeader;
