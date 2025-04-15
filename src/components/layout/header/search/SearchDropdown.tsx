
import React from "react";
import { Command } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import SearchSuggestions from "./SearchSuggestions";
import RecentSearches from "./RecentSearches";

interface SearchDropdownProps {
  searchHistory: string[];
  onSearchSelect: (query: string) => void;
  onRemoveFromHistory: (item: string, e: React.MouseEvent) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  searchHistory,
  onSearchSelect,
  onRemoveFromHistory,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="fixed w-[280px] lg:w-[350px] bg-background rounded-lg border border-border shadow-xl py-2 z-[100] mt-1"
      style={{
        top: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)"
      }}
    >
      {/* Keyboard shortcut hint */}
      <div className="px-3 py-1.5 flex items-center justify-between text-xs text-muted-foreground">
        <span>بحث سريع</span>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="h-5 text-[10px]">
            <Command className="h-3 w-3 mr-1" /> K
          </Badge>
        </div>
      </div>
      
      {/* Quick search suggestions */}
      <SearchSuggestions onSuggestionSelect={onSearchSelect} />
      
      {/* Recent searches */}
      {searchHistory.length > 0 && (
        <RecentSearches 
          searchHistory={searchHistory} 
          onSearchSelect={onSearchSelect}
          onRemoveFromHistory={onRemoveFromHistory}
        />
      )}
    </motion.div>
  );
};

export default SearchDropdown;
