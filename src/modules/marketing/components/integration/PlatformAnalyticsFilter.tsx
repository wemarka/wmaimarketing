
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from "date-fns";
import { ar } from 'date-fns/locale';

interface PlatformAnalyticsFilterProps {
  onPlatformChange?: (platform: string) => void;
  onPeriodChange?: (period: string) => void;
  onDateChange?: (date: Date | undefined) => void;
}

const PlatformAnalyticsFilter: React.FC<PlatformAnalyticsFilterProps> = ({
  onPlatformChange,
  onPeriodChange,
  onDateChange
}) => {
  const [date, setDate] = React.useState<Date>();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onDateChange) onDateChange(selectedDate);
  };

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">تصفية البيانات:</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
            <Select onValueChange={onPlatformChange}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="اختر المنصة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المنصات</SelectItem>
                <SelectItem value="instagram">انستغرام</SelectItem>
                <SelectItem value="facebook">فيسبوك</SelectItem>
                <SelectItem value="twitter">تويتر</SelectItem>
                <SelectItem value="linkedin">لينكد إن</SelectItem>
                <SelectItem value="tiktok">تيك توك</SelectItem>
              </SelectContent>
            </Select>
            
            <Select onValueChange={onPeriodChange}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="الفترة الزمنية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">اليوم</SelectItem>
                <SelectItem value="week">الأسبوع</SelectItem>
                <SelectItem value="month">الشهر</SelectItem>
                <SelectItem value="quarter">الربع</SelectItem>
                <SelectItem value="year">السنة</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-right font-normal bg-background"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: ar }) : "اختر تاريخ"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="hidden md:flex items-center md:mr-auto">
            <Tabs defaultValue="chart" className="w-[250px]">
              <TabsList>
                <TabsTrigger value="chart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <line x1="12" y1="20" x2="12" y2="10"></line>
                    <line x1="18" y1="20" x2="18" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="16"></line>
                  </svg>
                  رسم بياني
                </TabsTrigger>
                <TabsTrigger value="table">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="3" y1="15" x2="21" y2="15"></line>
                    <line x1="12" y1="3" x2="12" y2="21"></line>
                  </svg>
                  جدول
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformAnalyticsFilter;
