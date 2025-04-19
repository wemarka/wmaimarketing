
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface SearchDropdownProps {
  searchHistory: string[];
  onSearchSelect: (term: string) => void;
  onRemoveFromHistory: (term: string, e?: React.MouseEvent) => void;
  rtl?: boolean;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ 
  searchHistory,
  onSearchSelect,
  onRemoveFromHistory,
  rtl = false
}) => {
  const { t } = useTranslation();

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const renderHistoryItems = () => {
    if (searchHistory.length === 0) {
      return (
        <motion.div 
          variants={itemVariants}
          className="py-3 px-4 text-center text-sm text-white/60"
        >
          {t('search.noHistory', 'لا يوجد تاريخ بحث')}
        </motion.div>
      );
    }

    return searchHistory.map((term, index) => (
      <motion.div
        key={`${term}-${index}`}
        variants={itemVariants}
        className="flex items-center justify-between px-3 py-2 hover:bg-white/10"
      >
        <button
          onClick={() => onSearchSelect(term)}
          className={cn(
            "flex items-center gap-2 text-sm text-white w-full text-left", 
            rtl && "flex-row-reverse text-right"
          )}
        >
          <Clock className="h-3.5 w-3.5 text-white/60" />
          <span>{term}</span>
        </button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveFromHistory(term, e);
          }}
          className="h-6 w-6 text-white/60 hover:text-white hover:bg-white/10"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove</span>
        </Button>
      </motion.div>
    ));
  };

  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute top-full mt-1.5 left-0 right-0 z-50 bg-[#3a7a89] shadow-md rounded-md overflow-hidden border border-white/20"
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className={cn(
        "flex items-center justify-between py-2 px-3 text-white/80 border-b border-white/10",
        rtl && "flex-row-reverse"
      )}>
        <div className={cn("flex items-center gap-2", rtl && "flex-row-reverse")}>
          <Search className="h-3.5 w-3.5" />
          <span className="text-sm font-medium">{t('search.recentSearches', 'عمليات البحث الأخيرة')}</span>
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto custom-scrollbar">
        {renderHistoryItems()}
      </div>
    </motion.div>
  );
};

export default SearchDropdown;
