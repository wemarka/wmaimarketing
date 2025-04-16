
import React from "react";
import { cn } from "@/lib/utils";
import SidebarNavItem from "./SidebarNavItem";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface NavItem {
  id: string;
  to: string;
  icon: React.ReactNode;
  label: string;
}

interface SidebarNavSectionProps {
  title: string;
  items: NavItem[];
  expanded: boolean;
  checkIsActive: (path: string) => boolean;
  activePath: string;
}

const SidebarNavSection: React.FC<SidebarNavSectionProps> = ({
  title,
  items,
  expanded,
  checkIsActive,
  activePath
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05 
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className="w-full flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <AnimatePresence>
        {expanded && (
          <motion.h3
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={cn(
              "px-4 mb-2 text-xs font-medium text-white/60 uppercase tracking-wider",
              isRTL ? "text-right" : "text-left"
            )}
          >
            {title}
          </motion.h3>
        )}
      </AnimatePresence>
      
      <motion.div 
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
        className="space-y-1 w-full"
      >
        {items.map((item) => (
          <motion.div key={item.id} variants={itemAnimation}>
            <SidebarNavItem
              to={item.to}
              icon={item.icon}
              label={item.label}
              expanded={expanded}
              checkIsActive={checkIsActive}
              activePath={activePath}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SidebarNavSection;
