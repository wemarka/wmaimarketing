
import React from 'react';
import { motion } from 'framer-motion';
import { NavSection } from '@/modules/dashboard/utils/types/sidebarTypes';
import SidebarNavItem from '../SidebarNavItem';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface CollapsedViewSectionProps {
  navigationSections: NavSection[];
  expanded: boolean;
  checkIsActive: (path: string) => boolean;
  activePath: string;
}

const CollapsedViewSection: React.FC<CollapsedViewSectionProps> = ({
  navigationSections,
  expanded,
  checkIsActive,
  activePath
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  // Animation variants for collapsed mode
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className={cn(
        "flex flex-col space-y-6",
        isRTL ? "text-right items-end" : "text-left items-start"
      )}
    >
      {navigationSections.map((section, index) => (
        <motion.div
          key={section.title}
          variants={itemVariants}
          className={cn(
            "flex flex-col items-center w-full",
            index < navigationSections.length - 1 && "border-b border-white/10 pb-6"
          )}
        >
          <div className="h-6 mb-2 flex items-center justify-center">
            <div className="w-2 h-2 bg-white/30 rounded-full" />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            {section.items.map((item) => (
              <SidebarNavItem
                key={item.to}
                item={item}
                isActive={checkIsActive(item.to)}
                expanded={expanded}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CollapsedViewSection;
