
import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Campaign {
  id: string;
  name: string;
  description?: string;
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
      <div className="flex justify-between items-center">
        <Label>{t("scheduler.campaignSection.title", "الحملة التسويقية")}</Label>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaign">{t("scheduler.campaignSection.selectCampaign", "اختر الحملة")}</Label>
              <Select value={selectedCampaign} onValueChange={onCampaignChange}>
                <SelectTrigger id="campaign">
                  <SelectValue placeholder={t("scheduler.campaignSection.selectPlaceholder", "اختر حملة تسويقية")} />
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
            
            <Button
              variant="outline"
              className="w-full mt-2 gap-1"
              type="button"
            >
              <PlusCircle className="h-4 w-4" />
              {t("scheduler.campaignSection.createNew", "إنشاء حملة جديدة")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignSection;
