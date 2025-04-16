
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu } from "lucide-react";
import { motion } from "framer-motion";

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
      {expanded ? (
        <>
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-full p-2 flex items-center justify-center">
              <span className="text-[#3a7a89] font-bold text-xl">C</span>
            </div>
            <span className="ml-3 font-semibold text-white">
              Circle
            </span>
          </motion.div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleExpanded}
            className="h-8 w-8 text-white hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleExpanded}
          className="text-white hover:bg-white/10 rounded-full w-10 h-10 flex items-center justify-center"
        >
          <motion.div 
            className="bg-white rounded-full p-1.5 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-[#3a7a89] font-bold text-lg">C</span>
          </motion.div>
        </Button>
      )}
    </div>
  );
};

export default SidebarHeader;
