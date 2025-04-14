
import React from "react";
import { Search, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPlatformFilterChange: (platform: string) => void;
  onDateFilterChange?: (period: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  onSearchChange,
  onPlatformFilterChange,
  onDateFilterChange
}) => {
  const platforms = [
    { id: "all", label: "جميع المنصات" },
    { id: "instagram", label: "Instagram" },
    { id: "facebook", label: "Facebook" },
    { id: "tiktok", label: "TikTok" }
  ];

  const datePeriods = [
    { id: "all", label: "كل الفترات" },
    { id: "today", label: "اليوم" },
    { id: "week", label: "هذا الأسبوع" },
    { id: "month", label: "هذا الشهر" }
  ];

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

      {/* فلترة التاريخ */}
      {onDateFilterChange && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar size={14} />
              <span className="hidden sm:inline">التاريخ</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>تصفية حسب التاريخ</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {datePeriods.map(period => (
              <DropdownMenuItem 
                key={period.id}
                onClick={() => onDateFilterChange(period.id)}
              >
                {period.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* فلترة المنصات */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter size={14} />
            <span className="hidden sm:inline">تصفية</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>تصفية حسب المنصة</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {platforms.map(platform => (
            <DropdownMenuItem 
              key={platform.id}
              onClick={() => onPlatformFilterChange(platform.id)}
            >
              {platform.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchFilters;
