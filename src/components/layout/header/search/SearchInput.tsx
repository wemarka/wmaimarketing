
import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  searchQuery: string;
  isFocused: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onClear: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  isFocused,
  onChange,
  onFocus,
  onClear,
  inputRef,
}) => {
  return (
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
        onChange={onChange}
        onFocus={onFocus}
        ref={inputRef}
      />
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      
      <AnimatePresence>
        {searchQuery && (
          <motion.button 
            type="button"
            onClick={onClear}
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
  );
};

export default SearchInput;
