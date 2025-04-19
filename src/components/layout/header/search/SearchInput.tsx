
import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

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

  return (
    <div className={cn(
      "flex items-center relative bg-white/10 rounded-full border border-white/20",
      isFocused ? "bg-white/15 border-white/30" : "",
      rtl ? "flex-row-reverse" : ""
    )}>
      <div className={cn(
        "h-8 w-10 flex items-center justify-center text-white/70",
        rtl ? "rotate-0" : ""
      )}>
        <Search className="h-4 w-4" />
      </div>

      <input
        type="text"
        ref={inputRef}
        value={searchQuery}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={t('common.search', 'البحث...')}
        className={cn(
          "h-8 flex-grow bg-transparent outline-none text-sm text-white placeholder:text-white/60",
          rtl ? "text-right pl-2 pr-0" : "text-left pr-2 pl-0"
        )}
        dir={rtl ? "rtl" : "ltr"}
      />

      {searchQuery && (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          exit={{ scale: 0 }}
          className="mr-2"
        >
          <Button 
            type="button" 
            variant="ghost"
            size="icon" 
            onClick={onClear}
            className="h-6 w-6 text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="h-3.5 w-3.5" />
            <span className="sr-only">Clear search</span>
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default SearchInput;
