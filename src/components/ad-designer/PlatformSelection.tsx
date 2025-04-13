
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Share2, Globe } from "lucide-react";

interface PlatformSelectionProps {
  adContent: {
    platform: string;
  };
  onPlatformChange: (platform: string) => void;
  platformRecommendations: {
    styles: string[];
    callToAction: string[];
  };
}

const PlatformSelection: React.FC<PlatformSelectionProps> = ({
  adContent,
  onPlatformChange,
  platformRecommendations
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <Label>{t("adDesigner.platform")}</Label>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <Button 
            variant={adContent.platform === "instagram" ? "default" : "outline"} 
            onClick={() => onPlatformChange("instagram")}
            className="flex flex-col h-20 gap-2"
          >
            <Instagram />
            <span>{t("adDesigner.platforms.instagram")}</span>
          </Button>
          <Button 
            variant={adContent.platform === "facebook" ? "default" : "outline"}
            onClick={() => onPlatformChange("facebook")}
            className="flex flex-col h-20 gap-2"
          >
            <Facebook />
            <span>{t("adDesigner.platforms.facebook")}</span>
          </Button>
          <Button 
            variant={adContent.platform === "pinterest" ? "default" : "outline"}
            onClick={() => onPlatformChange("pinterest")}
            className="flex flex-col h-20 gap-2"
          >
            <Share2 />
            <span>{t("adDesigner.platforms.pinterest")}</span>
          </Button>
        </div>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg">
        <h4 className="font-medium mb-2 flex items-center">
          <Globe className="h-4 w-4 mr-2" />
          {t("adDesigner.platformRecommendations")}
        </h4>
        <ul className="text-sm space-y-2">
          <li>• {t("adDesigner.recommendedStyles")}: 
            <span className="text-primary"> 
              {platformRecommendations.styles?.join(", ") || "modern"}
            </span>
          </li>
          <li>• {t("adDesigner.recommendedCta")}: 
            <span className="text-primary"> 
              {platformRecommendations.callToAction?.map(cta => t(`adDesigner.cta.${cta}`)).join(", ") || t("adDesigner.cta.shop_now")}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlatformSelection;
