
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarHeaderProps {
  expanded: boolean;
  toggleExpanded: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ expanded, toggleExpanded }) => {
  return (
    <div className={cn(
      "flex items-center h-16 px-4",
      expanded ? "justify-between" : "justify-center"
    )}>
      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div 
            className="flex items-center"
            key="expanded"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-full p-1.5 flex items-center justify-center">
              <span className="text-[#3a7a89] font-bold text-xl">C</span>
            </div>
            <span className="ml-3 font-semibold text-white">
              Circle
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-full p-1.5 flex items-center justify-center"
          >
            <span className="text-[#3a7a89] font-bold text-lg">C</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {expanded && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleExpanded}
          className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
      
      {!expanded && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleExpanded}
          className="absolute -right-3 top-6 text-white bg-[#3a7a89] hover:bg-[#2c6c7a] rounded-full w-6 h-6 flex items-center justify-center shadow-md"
        >
          <Menu className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default SidebarHeader;
