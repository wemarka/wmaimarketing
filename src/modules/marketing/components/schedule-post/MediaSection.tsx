
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MediaSectionProps {
  previewUrls: string[];
  handleMediaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeMedia: (index: number) => void;
}

const MediaSection: React.FC<MediaSectionProps> = ({
  previewUrls,
  handleMediaChange,
  removeMedia,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <Label htmlFor="media" className="block mb-3">
          {t("scheduler.mediaSection.uploadMedia")}
        </Label>

        <div className="flex items-center justify-center w-full">
          <Label
            htmlFor="media"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/30 hover:bg-secondary/40"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                {t("scheduler.mediaSection.dragAndDrop")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("scheduler.mediaSection.supportedFormats")}
              </p>
            </div>
            <Input
              id="media"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleMediaChange}
              multiple
            />
          </Label>
        </div>
      </div>

      {previewUrls.length > 0 && (
        <div>
          <Label className="block mb-3">{t("scheduler.mediaSection.preview")}</Label>
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
                  onClick={() => removeMedia(index)}
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

export default MediaSection;
