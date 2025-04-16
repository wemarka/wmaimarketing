
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TabsTrigger } from "@/components/ui/tabs";

interface NavTabItemProps {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const NavTabItem: React.FC<NavTabItemProps> = ({
  id,
  title,
  path,
  icon,
  isActive,
}) => {
  return (
    <TabsTrigger 
      key={id}
      value={id}
      asChild
      className={cn(
        "px-5 relative group transition-all duration-300",
        "data-[state=active]:text-[#3a7a89] dark:data-[state=active]:text-white",
        "data-[state=active]:font-semibold",
        "text-gray-100/90 dark:text-gray-200/80",
        "hover:text-white dark:hover:text-white",
        "mx-0.5"
      )}
    >
      <Link to={path} className="flex items-center gap-2 z-10 relative">
        <motion.span 
          whileHover={{ scale: 1.15 }} 
          whileTap={{ scale: 0.95 }}
          initial={false}
          className={cn(
            isActive ? "text-[#3a7a89] dark:text-white" : "text-white/80"
          )}
        >
          {icon}
        </motion.span>
        <span>{title}</span>
        
        {isActive && (
          <motion.div 
            layoutId="activeTab"
            className="absolute inset-0 bg-white dark:bg-slate-800/80 rounded-lg shadow-md -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />
        )}
      </Link>
    </TabsTrigger>
  );
};

export default NavTabItem;
