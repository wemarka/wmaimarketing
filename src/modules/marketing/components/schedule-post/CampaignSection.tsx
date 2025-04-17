
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface Campaign {
  id: string;
  name: string;
}

interface CampaignSectionProps {
  campaigns: Campaign[];
  selectedCampaign: string;
  onCampaignChange: (campaignId: string) => void;
}

const CampaignSection: React.FC<CampaignSectionProps> = ({
  campaigns,
  selectedCampaign,
  onCampaignChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="campaign">{t("scheduler.campaignSection.title", "الحملة التسويقية")}</Label>
        <Select value={selectedCampaign} onValueChange={onCampaignChange}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder={t("scheduler.campaignSection.placeholder", "اختر الحملة")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">
              {t("scheduler.campaignSection.noCampaign", "بدون حملة")}
            </SelectItem>
            {campaigns.map((campaign) => (
              <SelectItem key={campaign.id} value={campaign.id}>
                {campaign.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CampaignSection;
