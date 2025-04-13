
import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface AdvancedOptionsProps {
  adContent: {
    fontSize?: number;
    overlayOpacity?: number;
    showLogo?: boolean;
    adSize?: string;
    brandPosition?: string;
    effectStyle?: string;
    customFont?: string;
    textShadow?: boolean;
  };
  onUpdate: (field: string, value: any) => void;
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  adContent,
  onUpdate
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="adSize">{t("adDesigner.advancedOptions.adSize")}</Label>
        <Select 
          value={adContent.adSize || "square"} 
          onValueChange={(value) => onUpdate("adSize", value)}
        >
          <SelectTrigger id="adSize">
            <SelectValue placeholder={t("adDesigner.advancedOptions.selectSize")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="square">{t("adDesigner.advancedOptions.sizes.square")} (1:1)</SelectItem>
            <SelectItem value="portrait">{t("adDesigner.advancedOptions.sizes.portrait")} (4:5)</SelectItem>
            <SelectItem value="landscape">{t("adDesigner.advancedOptions.sizes.landscape")} (16:9)</SelectItem>
            <SelectItem value="story">{t("adDesigner.advancedOptions.sizes.story")} (9:16)</SelectItem>
            <SelectItem value="wide">{t("adDesigner.advancedOptions.sizes.wide")} (2:1)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="effectStyle">{t("adDesigner.advancedOptions.effectStyle")}</Label>
        <Select 
          value={adContent.effectStyle || "none"} 
          onValueChange={(value) => onUpdate("effectStyle", value)}
        >
          <SelectTrigger id="effectStyle">
            <SelectValue placeholder={t("adDesigner.advancedOptions.selectEffect")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">{t("adDesigner.advancedOptions.effects.none")}</SelectItem>
            <SelectItem value="gradient">{t("adDesigner.advancedOptions.effects.gradient")}</SelectItem>
            <SelectItem value="blur">{t("adDesigner.advancedOptions.effects.blur")}</SelectItem>
            <SelectItem value="overlay">{t("adDesigner.advancedOptions.effects.overlay")}</SelectItem>
            <SelectItem value="duotone">{t("adDesigner.advancedOptions.effects.duotone")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="fontSize">{t("adDesigner.advancedOptions.fontSize")}</Label>
          <span className="text-sm">{adContent.fontSize || 100}%</span>
        </div>
        <Slider
          id="fontSize"
          min={60}
          max={160}
          step={5}
          value={[adContent.fontSize || 100]}
          onValueChange={(value) => onUpdate("fontSize", value[0])}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="overlayOpacity">{t("adDesigner.advancedOptions.overlayOpacity")}</Label>
          <span className="text-sm">{adContent.overlayOpacity || 0}%</span>
        </div>
        <Slider
          id="overlayOpacity"
          min={0}
          max={100}
          step={5}
          value={[adContent.overlayOpacity || 0]}
          onValueChange={(value) => onUpdate("overlayOpacity", value[0])}
        />
      </div>
      
      <div>
        <Label htmlFor="customFont">{t("adDesigner.advancedOptions.customFont")}</Label>
        <Select 
          value={adContent.customFont || "default"} 
          onValueChange={(value) => onUpdate("customFont", value)}
        >
          <SelectTrigger id="customFont">
            <SelectValue placeholder={t("adDesigner.advancedOptions.selectFont")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">{t("adDesigner.advancedOptions.fonts.default")}</SelectItem>
            <SelectItem value="elegant">{t("adDesigner.advancedOptions.fonts.elegant")}</SelectItem>
            <SelectItem value="bold">{t("adDesigner.advancedOptions.fonts.bold")}</SelectItem>
            <SelectItem value="playful">{t("adDesigner.advancedOptions.fonts.playful")}</SelectItem>
            <SelectItem value="minimal">{t("adDesigner.advancedOptions.fonts.minimal")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="brandPosition">{t("adDesigner.advancedOptions.brandPosition")}</Label>
        <Select 
          value={adContent.brandPosition || "bottom"} 
          onValueChange={(value) => onUpdate("brandPosition", value)}
        >
          <SelectTrigger id="brandPosition">
            <SelectValue placeholder={t("adDesigner.advancedOptions.selectPosition")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top">{t("adDesigner.advancedOptions.positions.top")}</SelectItem>
            <SelectItem value="bottom">{t("adDesigner.advancedOptions.positions.bottom")}</SelectItem>
            <SelectItem value="left">{t("adDesigner.advancedOptions.positions.left")}</SelectItem>
            <SelectItem value="right">{t("adDesigner.advancedOptions.positions.right")}</SelectItem>
            <SelectItem value="center">{t("adDesigner.advancedOptions.positions.center")}</SelectItem>
            <SelectItem value="none">{t("adDesigner.advancedOptions.positions.none")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Separator />
      
      <div className="flex items-center justify-between">
        <Label htmlFor="showLogo">{t("adDesigner.advancedOptions.showLogo")}</Label>
        <Switch
          id="showLogo"
          checked={adContent.showLogo !== false}
          onCheckedChange={(checked) => onUpdate("showLogo", checked)}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="textShadow">{t("adDesigner.advancedOptions.textShadow")}</Label>
        <Switch
          id="textShadow"
          checked={adContent.textShadow === true}
          onCheckedChange={(checked) => onUpdate("textShadow", checked)}
        />
      </div>
    </div>
  );
};

export default AdvancedOptions;
