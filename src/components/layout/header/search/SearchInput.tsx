
import React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface SearchInputProps {
  searchQuery: string;
  isFocused: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onClear: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  rtl?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  isFocused,
  onChange,
  onFocus,
  onClear,
  inputRef,
  rtl = false
}) => {
  const { t } = useTranslation();
  
  const inputVariants = {
    focused: { boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.1)" },
    blurred: { boxShadow: "none" }
  };
  
  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, rotate: 15 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className={cn(
        "relative flex items-center rounded-md bg-white/10",
        "shadow-sm transition-all duration-300",
        isFocused && "bg-white/15"
      )}
      animate={isFocused ? "focused" : "blurred"}
      variants={inputVariants}
    >
      <motion.div 
        className={cn(
          "flex items-center px-2.5",
          rtl ? "order-last" : "order-first"
        )}
        whileHover="hover"
        whileTap="tap"
        variants={iconVariants}
      >
        <Search className="h-4 w-4 text-white" />
      </motion.div>
      
      <input
        type="text"
        placeholder={t("search.placeholder", "بحث...")}
        value={searchQuery}
        onChange={onChange}
        onFocus={onFocus}
        ref={inputRef}
        className={cn(
          "bg-transparent border-0 outline-none text-sm text-white placeholder:text-white/60",
          "py-1.5 w-full focus:ring-0",
          rtl ? "text-right pr-0 pl-2" : "text-left pl-0 pr-2"
        )}
        dir={rtl ? "rtl" : "ltr"}
      />
      
      <AnimatePresence>
        {searchQuery && (
          <motion.button
            type="button"
            onClick={onClear}
            className={cn(
              "p-1 text-white/60 hover:text-white rounded-full mr-1",
              "focus:outline-none focus:ring-1 focus:ring-white/30"
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="h-3.5 w-3.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchInput;
