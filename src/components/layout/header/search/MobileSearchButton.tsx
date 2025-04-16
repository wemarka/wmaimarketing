
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SearchInput from "./SearchInput";
import { useSearch } from "./useSearch";
import SearchDropdown from "./SearchDropdown";

const MobileSearchButton: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const {
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
  } = useSearch();

  return (
    <div className="relative" ref={searchContainerRef}>
      {!expanded ? (
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-9 w-9 bg-white/15 hover:bg-white/25"
          onClick={() => setExpanded(true)}
        >
          <Search className="h-4.5 w-4.5" />
        </Button>
      ) : (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "220px", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <SearchInput 
              searchQuery={searchQuery}
              isFocused={isFocused}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onClear={clearSearch}
              inputRef={inputRef}
            />
            
            <AnimatePresence>
              {isFocused && (
                <SearchDropdown 
                  searchHistory={searchHistory}
                  onSearchSelect={handleSearch}
                  onRemoveFromHistory={removeFromHistory}
                />
              )}
            </AnimatePresence>
          </form>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 ml-1"
            onClick={() => setExpanded(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default MobileSearchButton;
