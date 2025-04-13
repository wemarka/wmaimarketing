
import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { VideoSettingsType, VIDEO_THEMES, STYLE_PRESETS, StylePresetType } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface VideoThemesProps {
  videoSettings: VideoSettingsType;
  handleInputChange: (field: string, value: any) => void;
}

const VideoThemes: React.FC<VideoThemesProps> = ({ 
  videoSettings, 
  handleInputChange 
}) => {
  const { t } = useTranslation();
  
  const handleSelectTheme = (index: number) => {
    const theme = VIDEO_THEMES[index];
    handleInputChange("textColor", theme.textColor);
    handleInputChange("backgroundColor", theme.backgroundColor);
    handleInputChange("overlayOpacity", theme.overlayOpacity);
    handleInputChange("theme", theme.name);
  };
  
  const handleSelectStylePreset = (preset: StylePresetType) => {
    handleInputChange("stylePreset", preset);
  };
  
  const isThemeSelected = (theme: typeof VIDEO_THEMES[0]) => {
    return videoSettings.textColor === theme.textColor && 
           videoSettings.backgroundColor === theme.backgroundColor;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-3 block">سمات الفيديو</Label>
        <div className="grid grid-cols-3 gap-3">
          {VIDEO_THEMES.map((theme, index) => (
            <motion.button
              key={theme.name}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative overflow-hidden p-4 border rounded-lg transition-all ${
                isThemeSelected(theme) ? 'ring-2 ring-primary' : 'hover:border-primary/50'
              }`}
              onClick={() => handleSelectTheme(index)}
            >
              <div 
                className="h-16 rounded-md mb-2"
                style={{ 
                  background: theme.preview || theme.backgroundColor || 'transparent',
                }}
              ></div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{theme.name}</div>
                {isThemeSelected(theme) && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      
      <div>
        <Label className="mb-3 block">أنماط العرض</Label>
        <Tabs 
          value={videoSettings.stylePreset || "classic"} 
          onValueChange={(value) => handleSelectStylePreset(value as StylePresetType)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-3">
            <TabsTrigger value="classic">{STYLE_PRESETS.classic.name}</TabsTrigger>
            <TabsTrigger value="modern">{STYLE_PRESETS.modern.name}</TabsTrigger>
            <TabsTrigger value="minimal">{STYLE_PRESETS.minimal.name}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classic" className="p-4 border rounded-md">
            <p className="text-sm text-muted-foreground">{STYLE_PRESETS.classic.description}</p>
            <div className="mt-3 h-24 bg-muted rounded-md flex items-end justify-center overflow-hidden">
              <div className="w-full p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                <h4 className="font-bold text-sm mb-1">اسم المنتج</h4>
                <p className="text-xs opacity-90">وصف مختصر للمنتج</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="modern" className="p-4 border rounded-md">
            <p className="text-sm text-muted-foreground">{STYLE_PRESETS.modern.description}</p>
            <div className="mt-3 h-24 bg-muted rounded-md flex items-center justify-center overflow-hidden">
              <div className="bg-black/40 backdrop-blur-sm p-3 rounded-md text-white">
                <h4 className="font-bold text-sm mb-1">اسم المنتج</h4>
                <p className="text-xs opacity-90">وصف مختصر</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="minimal" className="p-4 border rounded-md">
            <p className="text-sm text-muted-foreground">{STYLE_PRESETS.minimal.description}</p>
            <div className="mt-3 h-24 bg-muted rounded-md flex items-center justify-center overflow-hidden">
              <div className="text-center text-white">
                <h4 className="font-bold text-sm">اسم المنتج</h4>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VideoThemes;
