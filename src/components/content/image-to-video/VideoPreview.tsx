
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Video } from "lucide-react";
import { TemplateType } from "./types";

interface VideoPreviewProps {
  selectedImage: string | null;
  videoGenerated: boolean;
  selectedTemplate: TemplateType;
  videoSettings: {
    title: string;
    subtitle: string;
    cta: string;
  };
  duration: number[];
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  selectedImage,
  videoGenerated,
  selectedTemplate,
  videoSettings,
  duration,
}) => {
  return (
    <Card className="overflow-hidden">
      <AspectRatio ratio={9 / 16}>
        {videoGenerated ? (
          <div className="relative bg-black w-full h-full">
            {/* Here would be a real video player in production */}
            <img
              src={selectedImage || ""}
              alt="Video preview"
              className={`w-full h-full object-cover ${selectedTemplate === "zoom" ? "animate-pulse-scale" : 
                        selectedTemplate === "pan" ? "animate-pan" :
                        "animate-slow-spin"}`}
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              {videoSettings.title && <h3 className="text-xl font-bold mb-1">{videoSettings.title}</h3>}
              {videoSettings.subtitle && <p className="mb-4 text-sm opacity-90">{videoSettings.subtitle}</p>}
              {videoSettings.cta && (
                <div className="inline-block bg-beauty-pink text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  {videoSettings.cta}
                </div>
              )}
            </div>
            
            <div className="absolute top-4 right-4">
              <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-beauty-purple"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-muted w-full h-full">
            <Video className="h-12 w-12 mb-2 text-muted-foreground" />
            <p className="text-muted-foreground text-center max-w-xs">
              {selectedImage 
                ? "انقر على زر إنشاء الفيديو لمعاينة النتيجة" 
                : "يرجى رفع صورة أولاً"}
            </p>
          </div>
        )}
      </AspectRatio>
      <CardContent className="p-4">
        {videoGenerated && (
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{videoSettings.title || "فيديو المنتج"}</p>
              <p className="text-xs text-muted-foreground">{duration[0]} ثوانٍ • قالب {selectedTemplate}</p>
            </div>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              تحميل
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoPreview;
