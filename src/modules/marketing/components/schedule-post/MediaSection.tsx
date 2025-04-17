
import React, { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MediaSectionProps {
  previewUrls: string[];
  onMediaChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveMedia: (index: number) => void;
}

const MediaSection: React.FC<MediaSectionProps> = ({
  previewUrls,
  onMediaChange,
  onRemoveMedia,
}) => {
  const { t } = useTranslation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium">
            {t("scheduler.mediaSection.uploadLabel")}
          </h4>
          <p className="text-xs text-muted-foreground">
            {t("scheduler.mediaSection.supportedFormats")}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          className="gap-1"
        >
          <ImagePlus className="h-4 w-4" />
          <span>{t("scheduler.mediaSection.uploadButton")}</span>
        </Button>
        <Input
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          ref={fileInputRef}
          onChange={onMediaChange}
        />
      </div>

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previewUrls.map((url, index) => (
            <div
              key={index}
              className="relative group border rounded-md overflow-hidden aspect-square"
            >
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onRemoveMedia(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaSection;
