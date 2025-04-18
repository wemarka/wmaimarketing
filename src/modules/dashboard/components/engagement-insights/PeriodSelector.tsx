
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import CompareIcon from "../../icons/CompareIcon";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PeriodSelectorProps {
  value?: string;
  timeRange?: string; 
  onChange: (value: string) => void;
  compareMode?: boolean;
  onCompareModeToggle?: () => void;
}

export const PeriodSelector = ({ 
  value, 
  timeRange,
  onChange,
  compareMode,
  onCompareModeToggle
}: PeriodSelectorProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  // Use timeRange if value is not provided
  const selectedValue = value || timeRange || "week";
  
  const buttonAnimation = {
    tap: { scale: 0.97 },
    hover: { scale: 1.03 }
  };
  
  return (
    <div className={cn(
      "flex items-center gap-4",
      isRTL ? "flex-row-reverse" : "justify-end"
    )}>
      <Select value={selectedValue} onValueChange={onChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue>{t(`dashboard.timeRanges.${selectedValue}`, selectedValue)}</SelectValue>
        </SelectTrigger>
        <SelectContent align={isRTL ? "end" : "start"} side={isRTL ? "right" : "bottom"}>
          <SelectItem value="day">{t("dashboard.timeRanges.day", "يوم")}</SelectItem>
          <SelectItem value="week">{t("dashboard.timeRanges.week", "أسبوع")}</SelectItem>
          <SelectItem value="month">{t("dashboard.timeRanges.month", "شهر")}</SelectItem>
          <SelectItem value="quarter">{t("dashboard.timeRanges.quarter", "ربع سنة")}</SelectItem>
          <SelectItem value="year">{t("dashboard.timeRanges.year", "سنة")}</SelectItem>
        </SelectContent>
      </Select>
      
      {onCompareModeToggle && (
        <motion.div 
          variants={buttonAnimation}
          whileTap="tap"
          whileHover="hover"
          className={isRTL ? "mr-auto" : "ml-auto"}
        >
          <Button 
            variant={compareMode ? "default" : "outline"}
            size="sm"
            className={cn(
              "transition-all", 
              isRTL ? "mr-2 flex-row-reverse" : "ml-2",
              compareMode && "bg-[#3a7a89] hover:bg-[#2c6c7a]"
            )}
            onClick={onCompareModeToggle}
            data-state={compareMode ? "active" : "inactive"}
          >
            <CompareIcon className={cn(
              "h-4 w-4", 
              isRTL ? "ml-2" : "mr-2",
              "transition-transform",
              compareMode && "rotate-180"
            )} />
            {t("dashboard.compare", "مقارنة")}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default PeriodSelector;
