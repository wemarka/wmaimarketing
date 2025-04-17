
import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock, Send } from "lucide-react";
import { format } from "date-fns";
import { ar } from 'date-fns/locale';
import { useTranslation } from "react-i18next";

interface Campaign {
  id: string;
  name: string;
}

interface SettingsSectionProps {
  platform: string;
  setPlatform: (platform: string) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selectedCampaign: string;
  setSelectedCampaign: (campaign: string) => void;
  campaigns: Campaign[];
  isSubmitting: boolean;
  handleSubmit: () => Promise<void>;
  title: string;
  content: string;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  platform,
  setPlatform,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  isSubmitting,
  handleSubmit,
  title,
  content
}) => {
  const { t } = useTranslation();
  
  // Generate time options for the select field (30-minute intervals)
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourString = hour.toString().padStart(2, '0');
      const minuteString = minute.toString().padStart(2, '0');
      timeOptions.push(`${hourString}:${minuteString}`);
    }
  }
  
  const platforms = [
    { id: 'facebook', name: 'Facebook' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'twitter', name: 'Twitter' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'tiktok', name: 'TikTok' }
  ];
  
  const isPlatformSelected = !!platform;
  const isContentReady = !!title && !!content;
  const canSubmit = isPlatformSelected && isContentReady && !isSubmitting;
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="platform">{t("scheduler.settings.platform", "المنصة")}</Label>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("scheduler.settings.platformPlaceholder", "اختر منصة النشر")} />
          </SelectTrigger>
          <SelectContent>
            {platforms.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>{t("scheduler.settings.scheduleDate", "تاريخ النشر")}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(selectedDate, 'PPP', { locale: ar })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="time">{t("scheduler.settings.scheduleTime", "وقت النشر")}</Label>
        <Select value={selectedTime} onValueChange={setSelectedTime}>
          <SelectTrigger className="w-full">
            <SelectValue>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {selectedTime}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button
        className="w-full gap-2"
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        <Send className="h-4 w-4" />
        {isSubmitting 
          ? t("scheduler.settings.scheduling", "جاري الجدولة...") 
          : t("scheduler.settings.schedule", "جدولة المنشور")}
      </Button>
      
      {!isPlatformSelected && (
        <p className="text-sm text-amber-600">
          {t("scheduler.settings.platformRequired", "الرجاء اختيار منصة للنشر")}
        </p>
      )}
      
      {!isContentReady && (
        <p className="text-sm text-amber-600">
          {t("scheduler.settings.contentRequired", "الرجاء إدخال عنوان ومحتوى للمنشور")}
        </p>
      )}
    </div>
  );
};

export default SettingsSection;
