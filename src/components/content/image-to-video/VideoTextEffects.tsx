
import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { VideoSettingsType, TextPositionType, TextEffectType } from "./types";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

interface VideoTextEffectsProps {
  videoSettings: VideoSettingsType;
  handleInputChange: (field: string, value: any) => void;
}

const VideoTextEffects: React.FC<VideoTextEffectsProps> = ({ 
  videoSettings, 
  handleInputChange 
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>موضع النص</Label>
        <RadioGroup 
          value={videoSettings.textPosition || "bottom"}
          onValueChange={(value: TextPositionType) => handleInputChange("textPosition", value)}
          className="flex space-x-4 space-x-reverse"
        >
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="top" id="top" />
            <Label htmlFor="top">أعلى</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="center" id="center" />
            <Label htmlFor="center">وسط</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="bottom" id="bottom" />
            <Label htmlFor="bottom">أسفل</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label>تأثير النص</Label>
        <RadioGroup 
          value={videoSettings.textEffect || "none"}
          onValueChange={(value: TextEffectType) => handleInputChange("textEffect", value)}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">بدون تأثير</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="typing" id="typing" />
            <Label htmlFor="typing">كتابة</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="fade" id="fade" />
            <Label htmlFor="fade">تلاشي</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="bounce" id="bounce" />
            <Label htmlFor="bounce">نطاط</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="overlayOpacity">شفافية الطبقة</Label>
          <span className="text-muted-foreground text-sm">{videoSettings.overlayOpacity || 50}%</span>
        </div>
        <Slider
          id="overlayOpacity"
          min={0}
          max={100}
          step={5}
          value={[videoSettings.overlayOpacity || 50]}
          onValueChange={(value) => handleInputChange("overlayOpacity", value[0])}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="textColor">لون النص</Label>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-10 h-10 rounded-md border"
                style={{ backgroundColor: videoSettings.textColor || '#ffffff' }}
                aria-label="اختر لون النص"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3">
              <HexColorPicker
                color={videoSettings.textColor || '#ffffff'}
                onChange={(color) => handleInputChange("textColor", color)}
              />
            </PopoverContent>
          </Popover>
          <Input
            id="textColor"
            value={videoSettings.textColor || '#ffffff'}
            onChange={(e) => handleInputChange("textColor", e.target.value)}
            className="flex-1"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="watermark">إظهار العلامة المائية</Label>
        <Switch
          id="watermark"
          checked={videoSettings.watermark !== false}
          onCheckedChange={(checked) => handleInputChange("watermark", checked)}
        />
      </div>
    </div>
  );
};

export default VideoTextEffects;
