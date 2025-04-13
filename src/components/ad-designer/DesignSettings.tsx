
import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DesignSettingsProps {
  adContent: {
    style: string;
    color: string;
    alignmentX: string;
  };
  onInputChange: (field: string, value: any) => void;
  colorRecommendations: string[];
}

const DesignSettings: React.FC<DesignSettingsProps> = ({ 
  adContent,
  onInputChange,
  colorRecommendations 
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <div>
        <Label>{t("adDesigner.style")}</Label>
        <RadioGroup 
          value={adContent.style}
          onValueChange={(value) => onInputChange("style", value)}
          className="flex flex-col space-y-2 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="modern" id="modern" />
            <Label htmlFor="modern">{t("adDesigner.styles.modern")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="minimal" id="minimal" />
            <Label htmlFor="minimal">{t("adDesigner.styles.minimal")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bold" id="bold" />
            <Label htmlFor="bold">{t("adDesigner.styles.bold")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="elegant" id="elegant" />
            <Label htmlFor="elegant">{t("adDesigner.styles.elegant")}</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="color">{t("adDesigner.color")}</Label>
        <div className="flex gap-2 mt-2">
          <Input 
            id="color" 
            type="color" 
            value={adContent.color}
            onChange={(e) => onInputChange("color", e.target.value)}
            className="w-12 h-10 p-1"
          />
          <Input 
            value={adContent.color}
            onChange={(e) => onInputChange("color", e.target.value)}
            className="flex-1"
          />
        </div>
        <div className="flex gap-1 mt-2">
          {colorRecommendations.map((color, index) => (
            <Button 
              key={index}
              variant="outline"
              className="h-8 w-8 p-0 rounded-full"
              style={{ backgroundColor: color }}
              onClick={() => onInputChange("color", color)}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {t("adDesigner.recommendedColors")}
        </p>
      </div>
      
      <div>
        <Label htmlFor="alignmentX">{t("adDesigner.textAlignment")}</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <Button
            type="button"
            variant={adContent.alignmentX === "left" ? "default" : "outline"}
            className="justify-center"
            onClick={() => onInputChange("alignmentX", "left")}
          >
            <span className="text-right w-full">اليمين</span>
          </Button>
          <Button
            type="button"
            variant={adContent.alignmentX === "center" ? "default" : "outline"}
            className="justify-center"
            onClick={() => onInputChange("alignmentX", "center")}
          >
            <span className="text-center w-full">وسط</span>
          </Button>
          <Button
            type="button"
            variant={adContent.alignmentX === "right" ? "default" : "outline"}
            className="justify-center"
            onClick={() => onInputChange("alignmentX", "right")}
          >
            <span className="text-left w-full">اليسار</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignSettings;
