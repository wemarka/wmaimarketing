
import React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useSearch } from "./search/useSearch";
import SearchInput from "./search/SearchInput";
import SearchDropdown from "./search/SearchDropdown";
import MobileSearchButton from "./search/MobileSearchButton";
import { useTranslation } from "react-i18next";

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
  
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  return (
    <div className="relative" ref={searchContainerRef}>
      <form 
        onSubmit={handleSearchSubmit} 
        className={cn(
          "relative hidden md:block transition-all duration-300",
          isFocused ? "w-[280px] lg:w-[350px]" : "w-[200px] lg:w-[250px]"
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <SearchInput 
          searchQuery={searchQuery}
          isFocused={isFocused}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onClear={clearSearch}
          inputRef={inputRef}
          rtl={isRTL}
        />
        
        <AnimatePresence>
          {isFocused && (
            <SearchDropdown 
              searchHistory={searchHistory}
              onSearchSelect={handleSearch}
              onRemoveFromHistory={removeFromHistory}
              rtl={isRTL}
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
