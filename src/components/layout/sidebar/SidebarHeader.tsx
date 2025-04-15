
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface SidebarHeaderProps {
  expanded: boolean;
  toggleExpanded: () => void;
  isMobile: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ expanded, toggleExpanded, isMobile }) => {
  return (
    <div className={cn(
      "flex items-center mb-8 w-full",
      expanded ? "justify-between" : "justify-center"
    )}>
      {expanded ? (
        <div className="flex items-center">
          <div className="bg-white rounded-lg border border-blue-200 p-2 flex items-center justify-center">
            <img 
              src="/lovable-uploads/4e8f9347-a119-4c61-b2c3-d97ad429f0db.png" 
              alt="Softtech" 
              className="h-6 w-6" 
            />
          </div>
          <div className="mr-3 text-right">
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">Softtech</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">Technology</span>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-900 p-2 flex items-center justify-center">
          <img 
            src="/lovable-uploads/4e8f9347-a119-4c61-b2c3-d97ad429f0db.png" 
            alt="Softtech" 
            className="h-6 w-6" 
          />
        </div>
      )}
      
      {!isMobile && (
        <button 
          onClick={toggleExpanded}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
        >
          <ChevronRight className={cn("h-5 w-5", expanded ? "" : "rotate-180")} />
        </button>
      )}
    </div>
  );
};

export default SidebarHeader;
