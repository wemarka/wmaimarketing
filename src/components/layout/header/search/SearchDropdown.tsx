
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
          className="py-6 px-4 text-center"
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <Search className="h-5 w-5" />
            <p>{t('search.noHistory', 'لا يوجد تاريخ بحث')}</p>
          </div>
        </motion.div>
      );
    }

    return searchHistory.map((term, index) => (
      <motion.div
        key={`${term}-${index}`}
        variants={itemVariants}
        whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
        className="flex items-center justify-between px-3 py-2 transition-colors rounded-sm"
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
          className="h-6 w-6 text-white/60 hover:text-white hover:bg-white/10 rounded-full"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">{t('search.remove', 'إزالة')}</span>
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
      className="absolute top-full mt-1.5 left-0 right-0 z-50 bg-[#3a7a89]/95 backdrop-blur-md shadow-lg rounded-md overflow-hidden border border-white/20"
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

      <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {renderHistoryItems()}
      </div>
    </motion.div>
  );
};

export default SearchDropdown;
