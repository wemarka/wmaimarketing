
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SidebarHeaderProps {
  expanded: boolean;
  toggleExpanded: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  expanded,
  toggleExpanded
}) => {
  return (
    <div className="h-16 min-h-16 px-3 flex items-center justify-between border-b border-white/20">
      <div className="flex items-center overflow-hidden">
        {expanded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <motion.div 
              className="w-9 h-9 rounded-full bg-gradient-to-br from-white/95 to-white/85 flex items-center justify-center mr-3 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-[#3a7a89] font-bold text-lg">C</span>
            </motion.div>
            <span className="text-white font-medium text-lg tracking-wide">Circle</span>
          </motion.div>
        ) : (
          <motion.div 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-white/95 to-white/85 flex items-center justify-center mx-auto shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <span className="text-[#3a7a89] font-bold text-xl">C</span>
          </motion.div>
        )}
      </div>
      
      <motion.button
        onClick={toggleExpanded}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          "bg-white/15 transition-colors border border-white/10",
          "text-white shadow-sm"
        )}
      >
        {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </motion.button>
    </div>
  );
};

export default SidebarHeader;
