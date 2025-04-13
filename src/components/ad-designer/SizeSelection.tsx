import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Settings, Square, LayoutPanelTop, TrendingUp, AlignVerticalJustifyCenter, LayoutTemplate } from "lucide-react";
import { SizeOption } from "./adSizesConfig";

interface SizeSelectionProps {
  adContent: {
    adSize: string;
    platform: string;
    customWidth: number;
    customHeight: number;
  };
  onInputChange: (field: string, value: any) => void;
  adSizesConfig: {
    [key: string]: SizeOption[];
  };
}

const SizeSelection: React.FC<SizeSelectionProps> = ({
  adContent,
  onInputChange,
  adSizesConfig
}) => {
  const { t } = useTranslation();
  
  const getAvailableAdSizes = () => {
    return adSizesConfig[adContent.platform as keyof typeof adSizesConfig] || adSizesConfig.instagram;
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>{t("adDesigner.adSize")}</Label>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {getAvailableAdSizes().map((sizeOption) => (
            <Button
              key={sizeOption.id}
              variant={adContent.adSize === sizeOption.id ? "default" : "outline"}
              className="justify-start h-auto py-3"
              onClick={() => onInputChange("adSize", sizeOption.id)}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 flex items-center justify-center mr-3">
                  {sizeOption.icon}
                </div>
                <div className="text-right">
                  <p className="font-medium">{sizeOption.name}</p>
                  <p className="text-xs text-muted-foreground">{sizeOption.size}</p>
                </div>
              </div>
            </Button>
          ))}
          <Button
            variant={adContent.adSize === "custom" ? "default" : "outline"}
            className="justify-start h-auto py-3"
            onClick={() => onInputChange("adSize", "custom")}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 flex items-center justify-center mr-3">
                <Settings className="h-5 w-5" />
              </div>
              <div className="text-right">
                <p className="font-medium">{t("adDesigner.customSize")}</p>
                <p className="text-xs text-muted-foreground">{t("adDesigner.defineCustomDimensions")}</p>
              </div>
            </div>
          </Button>
        </div>
      </div>
      
      {adContent.adSize === "custom" && (
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="customWidth">{t("adDesigner.width")} (px)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="customWidth"
                type="number"
                value={adContent.customWidth}
                onChange={(e) => onInputChange("customWidth", parseInt(e.target.value))}
                className="w-20"
                min={200}
                max={2000}
              />
              <Slider
                value={[adContent.customWidth]}
                onValueChange={(value) => onInputChange("customWidth", value[0])}
                min={200}
                max={2000}
                step={10}
                className="flex-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="customHeight">{t("adDesigner.height")} (px)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="customHeight"
                type="number"
                value={adContent.customHeight}
                onChange={(e) => onInputChange("customHeight", parseInt(e.target.value))}
                className="w-20"
                min={200}
                max={2000}
              />
              <Slider
                value={[adContent.customHeight]}
                onValueChange={(value) => onInputChange("customHeight", value[0])}
                min={200}
                max={2000}
                step={10}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-muted/30 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2">{t("adDesigner.sizeRecommendations")}</h4>
        <p className="text-sm">{t("adDesigner.sizeExplanation", { platform: adContent.platform })}</p>
      </div>
    </div>
  );
};

export default SizeSelection;
