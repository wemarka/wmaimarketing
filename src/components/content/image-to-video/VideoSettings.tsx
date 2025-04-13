
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCw, Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VideoSettingsProps {
  selectedImage: string | null;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  duration: number[];
  setDuration: (duration: number[]) => void;
  videoSettings: {
    title: string;
    subtitle: string;
    cta: string;
  };
  handleInputChange: (field: string, value: string) => void;
  videoGenerating: boolean;
  setVideoGenerating: (generating: boolean) => void;
  setVideoGenerated: (generated: boolean) => void;
}

const VideoSettings: React.FC<VideoSettingsProps> = ({
  selectedImage,
  selectedTemplate,
  setSelectedTemplate,
  duration,
  setDuration,
  videoSettings,
  handleInputChange,
  videoGenerating,
  setVideoGenerating,
  setVideoGenerated
}) => {
  const { toast } = useToast();
  
  const handleGenerateVideo = () => {
    if (!selectedImage) {
      toast({
        title: "لا توجد صورة محددة",
        description: "يرجى اختيار صورة أولاً",
        variant: "destructive",
      });
      return;
    }
    
    setVideoGenerating(true);
    
    // Simulate video generation delay
    setTimeout(() => {
      setVideoGenerating(false);
      setVideoGenerated(true);
      
      toast({
        title: "تم إنشاء الفيديو",
        description: "تم إنشاء الفيديو بنجاح",
      });
    }, 3000);
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-2">إعدادات الفيديو</h3>
      
      <div className="space-y-2">
        <Label htmlFor="template">قالب الفيديو</Label>
        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
          <SelectTrigger>
            <SelectValue placeholder="اختر قالبًا" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="zoom">تكبير وتصغير</SelectItem>
            <SelectItem value="pan">تحريك أفقي</SelectItem>
            <SelectItem value="rotate">دوران</SelectItem>
            <SelectItem value="bounce">حركة نطاطة</SelectItem>
            <SelectItem value="slide">انزلاق</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="duration">مدة الفيديو</Label>
          <span className="text-muted-foreground text-sm">{duration[0]} ثوانٍ</span>
        </div>
        <Slider
          id="duration"
          min={3}
          max={15}
          step={1}
          value={duration}
          onValueChange={setDuration}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title">عنوان المنتج</Label>
        <Input
          id="title"
          placeholder="مثال: كريم الترطيب الفائق"
          value={videoSettings.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subtitle">وصف مختصر</Label>
        <Input
          id="subtitle"
          placeholder="مثال: ترطيب 24 ساعة"
          value={videoSettings.subtitle}
          onChange={(e) => handleInputChange("subtitle", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cta">نص الدعوة للإجراء</Label>
        <Input
          id="cta"
          placeholder="مثال: اطلبي الآن"
          value={videoSettings.cta}
          onChange={(e) => handleInputChange("cta", e.target.value)}
        />
      </div>
      
      <Button 
        className="w-full mt-4"
        onClick={handleGenerateVideo}
        disabled={!selectedImage || videoGenerating}
      >
        {videoGenerating ? (
          <>
            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
            جارِ إنشاء الفيديو...
          </>
        ) : (
          <>
            <Video className="mr-2 h-4 w-4" />
            إنشاء الفيديو
          </>
        )}
      </Button>
    </div>
  );
};

export default VideoSettings;
