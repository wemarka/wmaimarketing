
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentFormProps {
  platform: string;
  setPlatform: (platform: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  tone: string;
  setTone: (tone: string) => void;
  product: string;
  setProduct: (product: string) => void;
  generating: boolean;
  onGenerate: () => void;
}

const ContentForm: React.FC<ContentFormProps> = ({
  platform,
  setPlatform,
  language,
  setLanguage,
  tone,
  setTone,
  product,
  setProduct,
  generating,
  onGenerate
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">المنتج</label>
        <Select value={product} onValueChange={setProduct}>
          <SelectTrigger>
            <SelectValue placeholder="اختر المنتج" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="أحمر شفاه">أحمر شفاه</SelectItem>
            <SelectItem value="كريم ترطيب">كريم ترطيب</SelectItem>
            <SelectItem value="مسكارا">مسكارا</SelectItem>
            <SelectItem value="سيروم للبشرة">سيروم للبشرة</SelectItem>
            <SelectItem value="كريم أساس">كريم أساس</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">المنصة</label>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger>
            <SelectValue placeholder="اختر المنصة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">اللغة</label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="اختر اللغة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">الإنجليزية</SelectItem>
            <SelectItem value="arabic">العربية</SelectItem>
            <SelectItem value="both">الإنجليزية والعربية</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">نبرة المحتوى</label>
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger>
            <SelectValue placeholder="اختر نبرة المحتوى" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="professional">احترافية</SelectItem>
            <SelectItem value="friendly">ودية وغير رسمية</SelectItem>
            <SelectItem value="luxury">فاخرة وراقية</SelectItem>
            <SelectItem value="trendy">عصرية وجريئة</SelectItem>
            <SelectItem value="educational">تعليمية</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        className="w-full mt-4" 
        onClick={onGenerate}
        disabled={generating}
      >
        {generating ? (
          <>
            <Loader2 className="h-4 w-4 ml-2 animate-spin" />
            جاري الإنشاء...
          </>
        ) : (
          <>
            <MessageSquarePlus className="h-4 w-4 ml-2" />
            إنشاء المحتوى
          </>
        )}
      </Button>
    </div>
  );
};

export default ContentForm;
