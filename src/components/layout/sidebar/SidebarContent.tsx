
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarNavSection from "./SidebarNavSection";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const sectionAnimation = {
    hidden: { 
      opacity: 0, 
      y: 15,
      x: isRTL ? 20 : -20 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4 
      }
    }
  };

  return (
    <ScrollArea 
      className="h-[calc(100vh-64px-80px)] px-1" 
      scrollHideDelay={750}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <motion.div 
        className="py-4 flex flex-col space-y-6 px-2"
        initial="hidden"
        animate="visible"
        variants={containerAnimation}
      >
        <AnimatePresence mode="wait">
          {navigationSections.map((section, idx) => (
            <motion.div
              key={idx}
              variants={sectionAnimation}
              className="overflow-hidden"
              layout
              exit={{ opacity: 0, y: -10 }}
            >
              <SidebarNavSection
                title={section.title}
                items={section.items}
                expanded={expanded}
                checkIsActive={checkIsActive}
                activePath={activePath}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </ScrollArea>
  );
};

export default SidebarContent;
