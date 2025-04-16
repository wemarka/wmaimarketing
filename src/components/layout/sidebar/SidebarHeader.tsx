
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
    <div className="h-16 min-h-16 px-2 flex items-center justify-between border-b border-white/10">
      <div className="flex items-center">
        {expanded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center mr-3">
              <span className="text-[#3a7a89] font-bold text-lg">C</span>
            </div>
            <span className="text-white font-medium text-lg">Circle</span>
          </motion.div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center mx-auto">
            <span className="text-[#3a7a89] font-bold text-xl">C</span>
          </div>
        )}
      </div>
      
      <button
        onClick={toggleExpanded}
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          "bg-white/10 hover:bg-white/20 transition-colors",
          "text-white"
        )}
      >
        {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default SidebarHeader;
