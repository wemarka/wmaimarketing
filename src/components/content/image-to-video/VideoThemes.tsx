
import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { VideoSettingsType, VIDEO_THEMES } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  };
  
  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-3 block">سمات الفيديو</Label>
        <div className="grid grid-cols-2 gap-3">
          {VIDEO_THEMES.map((theme, index) => (
            <button
              key={theme.name}
              type="button"
              className={`relative p-4 border rounded-lg transition-all ${
                videoSettings.textColor === theme.textColor && 
                videoSettings.backgroundColor === theme.backgroundColor ? 
                'ring-2 ring-primary' : 'hover:border-primary/50'
              }`}
              onClick={() => handleSelectTheme(index)}
            >
              <div 
                className="h-12 rounded-md mb-2"
                style={{ 
                  background: theme.backgroundColor || 'transparent',
                  boxShadow: `inset 0 0 0 2000px rgba(0, 0, 0, ${theme.overlayOpacity / 100})` 
                }}
              ></div>
              <div className="text-sm font-medium">{theme.name}</div>
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <Label className="mb-3 block">أنماط العرض</Label>
        <Tabs defaultValue="classic" className="w-full">
          <TabsList className="grid grid-cols-3 mb-3">
            <TabsTrigger value="classic">كلاسيكي</TabsTrigger>
            <TabsTrigger value="modern">عصري</TabsTrigger>
            <TabsTrigger value="minimal">بسيط</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classic" className="p-3 border rounded-md">
            <p className="text-sm text-muted-foreground">شكل كلاسيكي مع نص واضح ومساحات متوازنة للأقسام المختلفة في الفيديو</p>
          </TabsContent>
          
          <TabsContent value="modern" className="p-3 border rounded-md">
            <p className="text-sm text-muted-foreground">تصميم عصري مع تأثيرات انتقالية سلسة وعناصر متحركة</p>
          </TabsContent>
          
          <TabsContent value="minimal" className="p-3 border rounded-md">
            <p className="text-sm text-muted-foreground">تصميم بسيط يركز على المنتج مع الحد الأدنى من العناصر النصية</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VideoThemes;
