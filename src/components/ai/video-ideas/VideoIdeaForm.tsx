
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Video } from "lucide-react";

interface VideoIdeaFormProps {
  productType: string;
  setProductType: (value: string) => void;
  platform: string;
  setPlatform: (value: string) => void;
  duration: string;
  setDuration: (value: string) => void;
  style: string;
  setStyle: (value: string) => void;
  isLoading: boolean;
  generateVideoIdea: () => void;
}

const VideoIdeaForm: React.FC<VideoIdeaFormProps> = ({
  productType,
  setProductType,
  platform,
  setPlatform,
  duration,
  setDuration,
  style,
  setStyle,
  isLoading,
  generateVideoIdea
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          نوع المنتج
        </label>
        <Input
          placeholder="مثال: كريم مرطب للوجه"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          المنصة
        </label>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger>
            <SelectValue placeholder="اختر المنصة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Instagram">انستغرام</SelectItem>
            <SelectItem value="TikTok">تيك توك</SelectItem>
            <SelectItem value="YouTube">يوتيوب</SelectItem>
            <SelectItem value="Facebook">فيسبوك</SelectItem>
            <SelectItem value="Snapchat">سناب شات</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          مدة الفيديو (بالثواني)
        </label>
        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger>
            <SelectValue placeholder="اختر المدة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15-30">15-30 ثانية</SelectItem>
            <SelectItem value="30-60">30-60 ثانية</SelectItem>
            <SelectItem value="60-90">60-90 ثانية</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          أسلوب الفيديو
        </label>
        <Select value={style} onValueChange={setStyle}>
          <SelectTrigger>
            <SelectValue placeholder="اختر الأسلوب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="عصري وجذاب">عصري وجذاب</SelectItem>
            <SelectItem value="احترافي وتعليمي">احترافي وتعليمي</SelectItem>
            <SelectItem value="عاطفي وملهم">عاطفي وملهم</SelectItem>
            <SelectItem value="مرح وممتع">مرح وممتع</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={generateVideoIdea} 
        className="w-full"
        disabled={isLoading || !productType.trim()}
      >
        {isLoading ? (
          <>
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            جارٍ إنشاء فكرة الفيديو...
          </>
        ) : (
          <>
            <Video className="ml-2 h-4 w-4" />
            إنشاء فكرة فيديو
          </>
        )}
      </Button>
    </div>
  );
};

export default VideoIdeaForm;
