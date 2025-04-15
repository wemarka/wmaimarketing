
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Clock, Loader2, Instagram, Facebook, Linkedin, Twitter, Youtube, LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SocialPlatformOption {
  value: string;
  label: string;
  icon: LucideIcon;
}

interface TimeOption {
  value: string;
  label: string;
}

interface SettingsSectionProps {
  platform: string;
  setPlatform: (platform: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selectedCampaign: string;
  setSelectedCampaign: (campaign: string) => void;
  campaigns: any[];
  isSubmitting: boolean;
  handleSubmit: () => void;
  title: string;
  content: string;
}

const platformOptions: SocialPlatformOption[] = [
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "facebook", label: "Facebook", icon: Facebook },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "twitter", label: "Twitter", icon: Twitter },
  { value: "youtube", label: "YouTube", icon: Youtube },
];

const timeOptions: TimeOption[] = [
  { value: "09:00", label: "9:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "21:00", label: "9:00 PM" },
];

const SettingsSection: React.FC<SettingsSectionProps> = ({
  platform,
  setPlatform,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedCampaign,
  setSelectedCampaign,
  campaigns,
  isSubmitting,
  handleSubmit,
  title,
  content
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex-grow space-y-6">
      <div className="space-y-3">
        <Label htmlFor="platform">{t("scheduler.settingsSection.platform")}</Label>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger>
            <SelectValue placeholder={t("scheduler.settingsSection.selectPlatform")} />
          </SelectTrigger>
          <SelectContent>
            {platformOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="flex items-center">
                <div className="flex items-center">
                  <option.icon className="h-4 w-4 ml-1 text-muted-foreground" />
                  <span className="ml-2">{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>{t("scheduler.settingsSection.date")}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="ml-2 h-4 w-4" />
              {selectedDate ? (
                <span>{format(selectedDate, "PPP")}</span>
              ) : (
                <span>{t("scheduler.settingsSection.pickDate")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-3">
        <Label>{t("scheduler.settingsSection.time")}</Label>
        <Select value={selectedTime} onValueChange={setSelectedTime}>
          <SelectTrigger>
            <SelectValue placeholder={t("scheduler.settingsSection.selectTime")} />
            <Clock className="h-4 w-4 ml-auto" />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {campaigns.length > 0 && (
        <div className="space-y-3">
          <Label htmlFor="campaign">{t("scheduler.settingsSection.campaign")}</Label>
          <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
            <SelectTrigger>
              <SelectValue placeholder={t("scheduler.settingsSection.selectCampaign")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">{t("scheduler.settingsSection.noCampaign")}</SelectItem>
              {campaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={isSubmitting || !title || !content || !platform || !selectedDate}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("common.scheduling")}
          </>
        ) : (
          t("scheduler.settingsSection.scheduleButton")
        )}
      </Button>
    </div>
  );
};

export default SettingsSection;
