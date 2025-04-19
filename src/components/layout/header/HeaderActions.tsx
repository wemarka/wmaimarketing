
import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import ThemeToggle from "./ThemeToggle";
import NotificationsPopover from "./NotificationsPopover";
import SearchBar from "./SearchBar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const HeaderActions: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  const buttonVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    tap: { scale: 0.98 }
  };
  
  return (
    <motion.div 
      className={cn(
        "flex items-center gap-1 md:gap-2", 
        isRTL ? "flex-row-reverse" : "flex-row"
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isMobile && <SearchBar />}
      
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div variants={buttonVariants} initial="initial" animate="animate" whileTap="tap">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white relative hover:bg-white/10 transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side={isRTL ? "left" : "right"}>
          <p>الإشعارات</p>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
};

export default HeaderActions;
