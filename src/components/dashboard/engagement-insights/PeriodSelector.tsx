
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface PeriodSelectorProps {
  timeRange: string;
  compareMode: boolean;
  onTimeRangeChange: (value: string) => void;
  onCompareModeToggle: () => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  timeRange,
  compareMode,
  onTimeRangeChange,
  onCompareModeToggle,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <Select 
        defaultValue={timeRange} 
        onValueChange={onTimeRangeChange}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder={t("dashboard.timeRanges.week")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">{t("dashboard.timeRanges.day")}</SelectItem>
          <SelectItem value="week">{t("dashboard.timeRanges.week")}</SelectItem>
          <SelectItem value="month">{t("dashboard.timeRanges.month")}</SelectItem>
        </SelectContent>
      </Select>
      
      <Badge 
        variant={compareMode ? "default" : "outline"}
        className="cursor-pointer"
        onClick={onCompareModeToggle}
      >
        {t("dashboard.compare")}
      </Badge>
    </div>
  );
};

export default PeriodSelector;
