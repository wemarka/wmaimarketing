
import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Default data
const recentSearches = [
  "تحليلات الحملة الإعلانية",
  "منشورات انستغرام",
];

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(recentSearches);
  const { toast } = useToast();
  
  // Create refs for components
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Add to search history if not already present
      if (!searchHistory.includes(query)) {
        setSearchHistory(prev => [query, ...prev.slice(0, 4)]);
      }
      
      toast({
        title: "جاري البحث",
        description: `تبحث عن: ${query}`,
      });
      
      // Close the search dropdown
      setIsFocused(false);
    }
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };
  
  const clearSearch = () => {
    setSearchQuery("");
  };
  
  const removeFromHistory = (item: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchHistory(prev => prev.filter(i => i !== item));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsFocused(true);
      }
      
      if (e.key === 'Escape' && isFocused) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFocused]);

  return {
    searchQuery,
    setSearchQuery,
    isFocused,
    setIsFocused,
    searchHistory, 
    handleSearchSubmit,
    clearSearch,
    removeFromHistory,
    searchContainerRef,
    inputRef,
    handleSearch
  };
};
