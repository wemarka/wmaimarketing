
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { GitCompareIcon } from "lucide-react";

interface PeriodSelectorProps {
  value?: string;
  timeRange?: string; // Added timeRange as an alternative prop name
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
  const isRTL = i18n.language === "ar";
  
  // Use timeRange if value is not provided
  const selectedValue = value || timeRange || "week";
  
  return (
    <div className="flex items-center gap-4 justify-end">
      <Select value={selectedValue} onValueChange={onChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue>{t(`dashboard.timeRanges.${selectedValue}`, selectedValue)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">{t("dashboard.timeRanges.day", "يوم")}</SelectItem>
          <SelectItem value="week">{t("dashboard.timeRanges.week", "أسبوع")}</SelectItem>
          <SelectItem value="month">{t("dashboard.timeRanges.month", "شهر")}</SelectItem>
          <SelectItem value="quarter">{t("dashboard.timeRanges.quarter", "ربع سنة")}</SelectItem>
          <SelectItem value="year">{t("dashboard.timeRanges.year", "سنة")}</SelectItem>
        </SelectContent>
      </Select>
      
      {onCompareModeToggle && (
        <Button 
          variant={compareMode ? "default" : "outline"}
          size="sm"
          className={isRTL ? "mr-2" : "ml-2"}
          onClick={onCompareModeToggle}
          data-state={compareMode ? "active" : "inactive"}
        >
          <GitCompareIcon className="h-4 w-4 mr-2" />
          {t("dashboard.compare", "مقارنة")}
        </Button>
      )}
    </div>
  );
};

export default PeriodSelector;
