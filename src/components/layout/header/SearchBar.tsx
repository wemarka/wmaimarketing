
import React, { useState } from "react";
import { Search, X, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const quickSearchSuggestions = [
  { label: "مستخدمين", icon: "👥" },
  { label: "منشورات", icon: "📱" },
  { label: "تحليلات", icon: "📊" },
  { label: "أدوات محتوى", icon: "🎨" },
];

const recentSearches = [
  "تحليلات الحملة الإعلانية",
  "منشورات انستغرام",
];

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(recentSearches);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to search history if not already present
      if (!searchHistory.includes(searchQuery)) {
        setSearchHistory(prev => [searchQuery, ...prev.slice(0, 4)]);
      }
      
      toast({
        title: "جاري البحث",
        description: `تبحث عن: ${searchQuery}`,
      });
      
      // Close the search dropdown
      setIsFocused(false);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery("");
  };
  
  const removeFromHistory = (item: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchHistory(prev => prev.filter(i => i !== item));
  };

  // Create a ref to track the dropdown menu
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Handle blur event more safely
  const handleBlur = (e: React.FocusEvent) => {
    // Short delay to allow clicking dropdown items
    setTimeout(() => {
      // Check if the new active element is inside our dropdown or input
      const currentActiveElement = document.activeElement;
      const dropdownContainsActive = dropdownRef.current?.contains(currentActiveElement as Node);
      const inputContainsActive = inputRef.current?.contains(currentActiveElement as Node);
      
      if (!dropdownContainsActive && !inputContainsActive) {
        setIsFocused(false);
      }
    }, 150);
  };

  return (
    <div className="relative">
      <form 
        onSubmit={handleSearch} 
        className={cn(
          "relative hidden md:block transition-all duration-300",
          isFocused ? "w-[280px] lg:w-[350px]" : "w-[200px] lg:w-[250px]"
        )}
      >
        <div className="relative">
          <Input 
            placeholder="بحث سريع..."
            className={cn(
              "h-9 pl-9 transition-all duration-300 pr-4",
              isFocused 
                ? "rounded-xl bg-background border-beauty-purple/30 shadow-sm" 
                : "rounded-full bg-muted/30 border-muted"
            )}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            ref={inputRef}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          
          <AnimatePresence>
            {searchQuery && (
              <motion.button 
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          {isFocused && (
            <motion.div 
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-1 w-full bg-background rounded-lg border border-border shadow-lg py-2 z-50"
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
              <div className="px-3 py-2">
                <div className="flex flex-wrap gap-1.5">
                  {quickSearchSuggestions.map((item, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      size="sm" 
                      className="h-7 gap-1.5 text-xs"
                      onClick={() => {
                        setSearchQuery(item.label);
                        handleSearch(new Event('submit') as unknown as React.FormEvent);
                      }}
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Recent searches */}
              {searchHistory.length > 0 && (
                <div className="mt-1 pt-1 border-t">
                  <p className="px-3 py-1 text-xs text-muted-foreground">البحوث الأخيرة</p>
                  <div className="max-h-[120px] overflow-y-auto">
                    {searchHistory.map((item, index) => (
                      <div 
                        key={index}
                        className="px-3 py-1.5 flex items-center justify-between hover:bg-muted/50 cursor-pointer"
                        onClick={() => {
                          setSearchQuery(item);
                          handleSearch(new Event('submit') as unknown as React.FormEvent);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Search className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{item}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => removeFromHistory(item, e)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      
      {/* Mobile search button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden rounded-full h-9 w-9"
        onClick={() => {
          toast({
            title: "بحث",
            description: "للبحث يرجى استخدام نسخة سطح المكتب",
          });
        }}
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SearchBar;
