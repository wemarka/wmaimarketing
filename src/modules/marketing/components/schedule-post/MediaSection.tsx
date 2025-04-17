
import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { ChangeEvent } from "react";

interface MediaSectionProps {
  previewUrls: string[];
  onMediaChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveMedia: (index: number) => void;
}

const MediaSection: React.FC<MediaSectionProps> = ({
  previewUrls,
  onMediaChange,
  onRemoveMedia
}) => {
  const { t } = useTranslation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAddMediaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>{t("scheduler.mediaSection.title", "الصور والوسائط")}</Label>
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={handleAddMediaClick}
        >
          <ImagePlus className="h-4 w-4" />
          <span>{t("scheduler.mediaSection.addMedia", "إضافة وسائط")}</span>
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        multiple
        onChange={onMediaChange}
      />

      <div>
        {previewUrls.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Media preview ${index + 1}`}
                  className="rounded-md w-full h-24 object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onRemoveMedia(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-gray-200 rounded-md p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={handleAddMediaClick}
          >
            <div className="flex flex-col items-center space-y-2">
              <ImagePlus className="h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">
                {t("scheduler.mediaSection.dropzone", "اضغط لإضافة صور أو فيديوهات للمنشور")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaSection;
