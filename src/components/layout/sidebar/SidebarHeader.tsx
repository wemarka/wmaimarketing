
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface SidebarHeaderProps {
  expanded: boolean;
  toggleExpanded: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ expanded, toggleExpanded }) => {
  return (
    <div className={cn(
      "flex items-center h-16 px-4 border-b border-border/60",
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
          <span className="mr-3 font-semibold text-gray-800 dark:text-gray-200">
            Softtech
          </span>
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
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleExpanded}
        className="h-8 w-8 text-gray-600 dark:text-gray-400"
      >
        <ChevronRight className={cn("h-4 w-4", expanded ? "" : "rotate-180")} />
      </Button>
    </div>
  );
};

export default SidebarHeader;
