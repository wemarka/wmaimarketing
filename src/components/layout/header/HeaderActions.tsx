
import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import ThemeToggle from "./ThemeToggle";
import NotificationsPopover from "./NotificationsPopover";
import UserPreferencesButton from "./UserPreferencesButton";
import SearchBar from "./SearchBar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const HeaderActions: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  return (
    <div className={cn(
      "flex items-center gap-1 md:gap-2", 
      isRTL ? "flex-row-reverse" : "flex-row"
    )}>
      {!isMobile && <SearchBar />}
      
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      
      <Button variant="ghost" size="icon" className="text-white">
        <Bell className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default HeaderActions;
