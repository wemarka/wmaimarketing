
import { Menu, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CompactHeaderProps {
  showSidebarTrigger?: boolean;
  pageTitle?: string;
  onToggleSidebar?: () => void;
  sidebarExpanded?: boolean;
}

const CompactHeader: React.FC<CompactHeaderProps> = ({ 
  showSidebarTrigger = false,
  pageTitle = "",
  onToggleSidebar,
  sidebarExpanded
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  // تحديد أيقونة الزر بناء على حالة القائمة الجانبية واتجاه اللغة
  const getToggleIcon = () => {
    if (sidebarExpanded) {
      return isRTL ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />;
    }
    return isRTL ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />;
  };

  return (
    <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
      {showSidebarTrigger && onToggleSidebar && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10"
          onClick={onToggleSidebar}
        >
          {getToggleIcon()}
        </Button>
      )}
      
      {pageTitle && (
        <motion.h2 
          className="font-medium text-lg text-white"
          initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {pageTitle}
        </motion.h2>
      )}
    </div>
  );
};

export default CompactHeader;
