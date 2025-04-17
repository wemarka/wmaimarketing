
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImagePlus, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MediaSectionProps {
  previewUrls: string[];
  onMediaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-md">
          {t("scheduler.mediaSection.title", "الوسائط")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img 
                  src={url} 
                  alt={`Preview ${index + 1}`} 
                  className="h-20 w-20 object-cover rounded-md" 
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-6 w-6 absolute -top-2 -right-2 rounded-full"
                  onClick={() => onRemoveMedia(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {previewUrls.length === 0 && (
              <div className="w-full p-8 border-2 border-dashed rounded-md flex justify-center items-center">
                <p className="text-muted-foreground text-center">
                  {t("scheduler.mediaSection.noMedia", "لم يتم إضافة وسائط بعد")}
                </p>
              </div>
            )}
          </div>
          
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={onMediaChange}
              className="hidden"
              id="media-upload"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleButtonClick}
              className="w-full"
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              {t("scheduler.mediaSection.addMedia", "إضافة وسائط")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaSection;
