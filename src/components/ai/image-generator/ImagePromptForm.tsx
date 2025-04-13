
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ImagePromptFormProps {
  prompt: string;
  setPrompt: (value: string) => void;
  size: "1024x1024" | "1024x1792" | "1792x1024";
  setSize: (value: "1024x1024" | "1024x1792" | "1792x1024") => void;
  style: "glamour" | "natural" | "vibrant";
  setStyle: (value: "glamour" | "natural" | "vibrant") => void;
}

const ImagePromptForm: React.FC<ImagePromptFormProps> = ({
  prompt, 
  setPrompt, 
  size, 
  setSize,
  style,
  setStyle
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium mb-2">
          وصف الصورة
        </label>
        <Textarea
          id="prompt"
          placeholder="صف الصورة التي تريد إنشاؤها، مثال: صورة لزجاجة مستحضر عناية بالبشرة على خلفية زهرية..."
          className="resize-none h-[100px]"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            حجم الصورة
          </label>
          <Select value={size} onValueChange={(value) => setSize(value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الحجم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1024x1024">مربع (1:1)</SelectItem>
              <SelectItem value="1024x1792">عمودي (9:16)</SelectItem>
              <SelectItem value="1792x1024">أفقي (16:9)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            أسلوب الصورة
          </label>
          <Select value={style} onValueChange={(value) => setStyle(value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الأسلوب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="glamour">فاخر وأنيق</SelectItem>
              <SelectItem value="natural">طبيعي</SelectItem>
              <SelectItem value="vibrant">نابض بالحياة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ImagePromptForm;
