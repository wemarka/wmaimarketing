
import React from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <motion.div 
      className="mt-1 pt-1 border-t"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <p className="px-3 py-1 text-xs text-muted-foreground">البحوث الأخيرة</p>
      <div className="max-h-[120px] overflow-y-auto scrollbar-thin">
        {searchHistory.map((item, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="px-3 py-1.5 flex items-center justify-between hover:bg-muted/50 cursor-pointer group"
            onClick={() => onSearchSelect(item)}
          >
            <div className="flex items-center gap-2">
              <Search className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm group-hover:text-primary transition-colors">{item}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => onRemoveFromHistory(item, e)}
            >
              <X className="h-3 w-3" />
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentSearches;
