
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
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <ScrollArea className="h-[calc(100vh-64px-80px)] pr-1">
      <motion.div 
        className="py-4 flex flex-col space-y-6 px-2"
        initial="hidden"
        animate="visible"
        variants={containerAnimation}
      >
        {navigationSections.map((section, idx) => (
          <motion.div
            key={idx}
            variants={itemAnimation}
            transition={{ duration: 0.3 }}
            layout
          >
            <SidebarNavSection
              title={section.title}
              items={section.items}
              expanded={expanded}
              checkIsActive={checkIsActive}
            />
          </motion.div>
        ))}
      </motion.div>
    </ScrollArea>
  );
};

export default SidebarContent;
