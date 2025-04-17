
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarTooltip } from "./SidebarTooltip";
import { useTooltip } from "@/hooks/use-tooltip";

interface SidebarHeaderProps {
  expanded: boolean;
  toggleExpanded: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  expanded,
  toggleExpanded
}) => {
  const { tooltipOpen, showTooltip, hideTooltip } = useTooltip();
  
  // Enhanced motion variants for animations
  const logoTextVariants = {
    initial: { opacity: 0, x: -20 },
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
      x: -10, 
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
  
  const buttonVariants = {
    hover: { 
      scale: 1.1, 
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      boxShadow: "0 0 8px rgba(255,255,255,0.3)" 
    },
    tap: { scale: 0.9 }
  };
  
  const containerVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 20
      } 
    }
  };

  return (
    <motion.div 
      className="h-16 min-h-16 px-3 flex items-center justify-between border-b border-white/20 bg-gradient-to-b from-[#3a7a89]/90 to-transparent backdrop-blur-md"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <div className="flex items-center overflow-hidden">
        <motion.div 
          className={cn(
            "w-10 h-10 rounded-full bg-gradient-to-br from-white/95 to-white/85 flex items-center justify-center shadow-lg",
            expanded ? "mr-3" : "mx-auto"
          )}
          variants={logoIconVariants}
          initial={false}
          animate={expanded ? "expanded" : "collapsed"}
          whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.95 }}
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
      
      <SidebarTooltip
        content={expanded ? "طي القائمة" : "توسيع القائمة"}
        open={tooltipOpen}
        onOpenChange={(open) => open ? showTooltip() : hideTooltip()}
        side="bottom"
      >
        <motion.button
          onClick={toggleExpanded}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            "bg-white/15 transition-colors border border-white/10",
            "text-white shadow-sm"
          )}
        >
          {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </motion.button>
      </SidebarTooltip>
    </motion.div>
  );
};

export default SidebarHeader;
