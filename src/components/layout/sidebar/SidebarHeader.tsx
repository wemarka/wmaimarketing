
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu } from "lucide-react";

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
          <div className="flex items-center">
            <div className="bg-white rounded-full p-2 flex items-center justify-center">
              <span className="text-[#3a7a89] font-bold text-xl">C</span>
            </div>
            <span className="ml-3 font-semibold text-white">
              Circle
            </span>
          </div>
          
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
          <div className="bg-white rounded-full p-1.5 flex items-center justify-center">
            <span className="text-[#3a7a89] font-bold text-lg">C</span>
          </div>
        </Button>
      )}
    </div>
  );
};

export default SidebarHeader;
