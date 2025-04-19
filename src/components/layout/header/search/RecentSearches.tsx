
import React from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface RecentSearchesProps {
  searchHistory: string[];
  onSearchSelect: (query: string) => void;
  onRemoveFromHistory: (item: string, e?: React.MouseEvent) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ 
  searchHistory, 
  onSearchSelect,
  onRemoveFromHistory 
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isRTL ? -20 : 20 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  if (searchHistory.length === 0) {
    return null;
  }

  return (
    <motion.div 
      className="mt-1 pt-1 border-t"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <p className={cn(
        "px-3 py-1 text-xs text-muted-foreground",
        isRTL ? "text-right" : "text-left"
      )}>البحوث الأخيرة</p>
      
      <div className="max-h-[120px] overflow-y-auto scrollbar-thin">
        <AnimatePresence initial={false}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {searchHistory.map((item, index) => (
              <motion.div 
                key={`${item}-${index}`}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className={cn(
                  "px-3 py-1.5 flex items-center hover:bg-muted/50 cursor-pointer group rounded-sm",
                  isRTL ? "flex-row-reverse justify-between" : "justify-between"
                )}
                onClick={() => onSearchSelect(item)}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
              >
                <div className={cn(
                  "flex items-center gap-2",
                  isRTL && "flex-row-reverse"
                )}>
                  <Search className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm group-hover:text-primary transition-colors">{item}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-muted"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromHistory(item, e);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RecentSearches;
