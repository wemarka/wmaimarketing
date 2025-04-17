
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface SidebarHeaderProps {
  expanded: boolean;
  toggleExpanded: () => void;
}

const CustomSidebarHeader: React.FC<SidebarHeaderProps> = ({
  expanded,
  toggleExpanded
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  // Enhanced motion variants for animations
  const logoTextVariants = {
    initial: { opacity: 0, x: isRTL ? 20 : -20 },
    animate: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 25,
        mass: 0.8,
        duration: 0.4 
      } 
    },
    exit: { 
      opacity: 0, 
      x: isRTL ? 10 : -10, 
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      } 
    }
  };
  
  const logoIconVariants = {
    expanded: { scale: 1 },
    collapsed: { 
      scale: 1.2, 
      transition: { 
        delay: 0.2, 
        duration: 0.4, 
        type: "spring",
        stiffness: 400,
        damping: 15
      } 
    }
  };

  return (
    <div 
      className="h-16 min-h-16 px-3 flex items-center justify-between border-b border-white/20 bg-gradient-to-b from-[#3a7a89]/90 to-transparent backdrop-blur-md"
    >
      <div className="flex items-center overflow-hidden">
        <motion.div 
          className={cn(
            "w-10 h-10 rounded-full bg-gradient-to-br from-white/95 to-white/85 flex items-center justify-center shadow-lg",
            expanded ? (isRTL ? "ml-3" : "mr-3") : "mx-auto"
          )}
          variants={logoIconVariants}
          initial={false}
          animate={expanded ? "expanded" : "collapsed"}
        >
          <span className="text-[#3a7a89] font-bold text-xl">C</span>
        </motion.div>
        
        <AnimatePresence>
          {expanded && (
            <motion.span 
              className="text-white font-medium text-lg tracking-wide"
              variants={logoTextVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              Circle
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      
      <button
        onClick={toggleExpanded}
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          "bg-white/15 transition-colors border border-white/10",
          "text-white shadow-sm hover:bg-white/25"
        )}
      >
        {expanded ? 
          (isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />) : 
          (isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)
        }
      </button>
    </div>
  );
};

export default CustomSidebarHeader;
