
import React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useSearch } from "./search/useSearch";
import SearchInput from "./search/SearchInput";
import SearchDropdown from "./search/SearchDropdown";
import MobileSearchButton from "./search/MobileSearchButton";

const SearchBar: React.FC = () => {
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
      <form 
        onSubmit={handleSearchSubmit} 
        className={cn(
          "relative hidden md:block transition-all duration-300",
          isFocused ? "w-[280px] lg:w-[350px]" : "w-[200px] lg:w-[250px]"
        )}
      >
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
      
      {/* Mobile search button */}
      <MobileSearchButton />
    </div>
  );
};

export default SearchBar;
