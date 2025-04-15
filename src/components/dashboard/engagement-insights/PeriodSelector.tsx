
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface PeriodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const PeriodSelector = ({ value, onChange }: PeriodSelectorProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  return (
    <div className="flex items-center gap-4 justify-end mb-4">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue>{t(`dashboard.timeRanges.${value}`, value)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">{t("dashboard.timeRanges.day")}</SelectItem>
          <SelectItem value="week">{t("dashboard.timeRanges.week")}</SelectItem>
          <SelectItem value="month">{t("dashboard.timeRanges.month")}</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        variant="outline" 
        size="sm"
        className={isRTL ? "mr-2" : "ml-2"}
      >
        {t("dashboard.compare", "Compare")}
      </Button>
    </div>
  );
};

export default PeriodSelector;
