
import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import ThemeToggle from "./ThemeToggle";
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import SearchBar from "./SearchBar";

const HeaderActions: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  const buttonVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    tap: { scale: 0.98 },
    hover: { scale: 1.05 }
  };
  
  return (
    <motion.div 
      className={cn(
        "flex items-center gap-2 md:gap-3", 
        isRTL ? "flex-row-reverse" : "flex-row"
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isMobile && <SearchBar />}
      
      <AnimatePresence mode="wait">
        <motion.div 
          className={cn("hidden md:flex items-center gap-2", isRTL && "flex-row-reverse")}
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
          transition={{ duration: 0.2 }}
        >
          <ThemeToggle />
        </motion.div>
      </AnimatePresence>
      
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div variants={buttonVariants} initial="initial" animate="animate" whileTap="tap" whileHover="hover">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white relative hover:bg-white/10 transition-colors"
                aria-label={t('notifications.title', 'الإشعارات')}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side={isRTL ? "left" : "right"} className="bg-slate-800 text-white border-slate-700">
            <p>{t('notifications.title', 'الإشعارات')}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div variants={buttonVariants} initial="initial" animate="animate" whileTap="tap" whileHover="hover">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10 transition-colors"
                aria-label={t('settings.title', 'الإعدادات')}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side={isRTL ? "left" : "right"} className="bg-slate-800 text-white border-slate-700">
            <p>{t('settings.title', 'الإعدادات')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};

export default HeaderActions;
