
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPlatformFilterChange: (platform: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  onSearchChange,
  onPlatformFilterChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 rtl:right-2.5 rtl:left-auto top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="بحث عن منشور..." 
          className="pl-8 rtl:pl-4 rtl:pr-8" 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter size={14} />
            <span className="hidden sm:inline">تصفية</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onPlatformFilterChange("all")}>
            جميع المنصات
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onPlatformFilterChange("instagram")}>
            Instagram
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onPlatformFilterChange("facebook")}>
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onPlatformFilterChange("tiktok")}>
            TikTok
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchFilters;
