
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { arEG } from "date-fns/locale";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

interface AdvancedFiltersProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  selectedPlatforms: string[];
  onPlatformChange: (platform: string) => void;
  availablePlatforms: string[];
}

interface DateRange {
  from: Date;
  to?: Date;
}

export const AdvancedFilters = ({
  dateRange,
  onDateRangeChange,
  selectedPlatforms,
  onPlatformChange,
  availablePlatforms
}: AdvancedFiltersProps) => {
  const activeFiltersCount = (dateRange ? 1 : 0) + (selectedPlatforms.length > 0 ? 1 : 0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="h-9 flex items-center gap-1.5"
        >
          <Filter className="h-4 w-4" />
          <span>فلترة متقدمة</span>
          {activeFiltersCount > 0 && (
            <Badge 
              variant="secondary" 
              className="mr-1.5 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">النطاق الزمني</h4>
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-right font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd LLL, y", { locale: arEG })} -{" "}
                          {format(dateRange.to, "dd LLL, y", { locale: arEG })}
                        </>
                      ) : (
                        format(dateRange.from, "dd LLL, y", { locale: arEG })
                      )
                    ) : (
                      <span>اختر التاريخ</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={onDateRangeChange}
                    numberOfMonths={2}
                    locale={arEG}
                  />
                </PopoverContent>
              </Popover>
              {dateRange && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDateRangeChange(undefined)}
                >
                  مسح التاريخ
                </Button>
              )}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">المنصات</h4>
            <ScrollArea className="h-[180px] pr-4">
              <div className="space-y-2">
                {availablePlatforms.map(platform => (
                  <div key={platform} className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Checkbox
                      id={platform}
                      checked={selectedPlatforms.includes(platform)}
                      onCheckedChange={() => onPlatformChange(platform)}
                    />
                    <label
                      htmlFor={platform}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {platform}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
            {selectedPlatforms.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 w-full"
                onClick={() => selectedPlatforms.forEach(p => onPlatformChange(p))}
              >
                مسح التصفية
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

