
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarNavSection from "./SidebarNavSection";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  id: string;
  to: string;
  icon: React.ReactNode;
  label: string;
}

interface NavigationSection {
  title: string;
  items: NavItem[];
}

interface SidebarContentProps {
  navigationSections: NavigationSection[];
  expanded: boolean;
  checkIsActive: (path: string) => boolean;
  activePath: string;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  navigationSections,
  expanded,
  checkIsActive,
  activePath
}) => {
  return (
    <ScrollArea className="h-[calc(100vh-64px-80px)] pr-1">
      <motion.div 
        className="py-4 flex flex-col space-y-6 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {navigationSections.map((section, idx) => (
          <SidebarNavSection
            key={idx}
            title={section.title}
            items={section.items}
            expanded={expanded}
            checkIsActive={checkIsActive}
          />
        ))}
      </motion.div>
    </ScrollArea>
  );
};

export default SidebarContent;
