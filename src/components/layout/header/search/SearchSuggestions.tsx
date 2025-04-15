
import React from "react";
import { Button } from "@/components/ui/button";

interface SearchSuggestionProps {
  onSuggestionSelect: (query: string) => void;
}

const quickSearchSuggestions = [
  { label: "مستخدمين", icon: "👥" },
  { label: "منشورات", icon: "📱" },
  { label: "تحليلات", icon: "📊" },
  { label: "أدوات محتوى", icon: "🎨" },
];

const SearchSuggestions: React.FC<SearchSuggestionProps> = ({ onSuggestionSelect }) => {
  return (
    <div className="px-3 py-2">
      <div className="flex flex-wrap gap-1.5">
        {quickSearchSuggestions.map((item, i) => (
          <Button 
            key={i} 
            variant="outline" 
            size="sm" 
            className="h-7 gap-1.5 text-xs"
            onClick={() => onSuggestionSelect(item.label)}
          >
            <span>{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
