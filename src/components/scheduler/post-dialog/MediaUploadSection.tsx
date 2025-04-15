
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MediaUploadSectionProps {
  previewUrls: string[];
  onMediaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveMedia: (index: number) => void;
}

const MediaUploadSection: React.FC<MediaUploadSectionProps> = ({
  previewUrls,
  onMediaChange,
  onRemoveMedia,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <Label>الوسائط</Label>
      <div className="border-2 border-dashed rounded-md p-6 text-center">
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          اسحب الصور أو الفيديو هنا أو انقر للتصفح
        </p>
        <Input 
          id="media" 
          type="file" 
          className="hidden" 
          accept="image/*,video/*"
          onChange={onMediaChange}
        />
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2" 
          onClick={() => document.getElementById('media')?.click()}
        >
          تحميل الوسائط
        </Button>
      </div>

      {previewUrls.length > 0 && (
        <div className="mt-4">
          <Label className="block mb-2">معاينة</Label>
          <div className="grid grid-cols-3 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
                <button
                  className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onRemoveMedia(index)}
                  type="button"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUploadSection;
