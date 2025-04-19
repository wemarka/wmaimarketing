
import React from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecentSearchesProps {
  searchHistory: string[];
  onSearchSelect: (query: string) => void;
  onRemoveFromHistory: (item: string, e?: React.MouseEvent) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ 
  searchHistory, 
  onSearchSelect,
  onRemoveFromHistory 
}) => {
  return (
    <div className="mt-1 pt-1 border-t">
      <p className="px-3 py-1 text-xs text-muted-foreground">البحوث الأخيرة</p>
      <div className="max-h-[120px] overflow-y-auto">
        {searchHistory.map((item, index) => (
          <div 
            key={index}
            className="px-3 py-1.5 flex items-center justify-between hover:bg-muted/50 cursor-pointer"
            onClick={() => onSearchSelect(item)}
          >
            <div className="flex items-center gap-2">
              <Search className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm">{item}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => onRemoveFromHistory(item, e)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
