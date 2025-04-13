
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VideoIdeaDisplayProps {
  videoIdea: string | null;
  errorMessage: string | null;
}

const VideoIdeaDisplay: React.FC<VideoIdeaDisplayProps> = ({
  videoIdea,
  errorMessage
}) => {
  const { toast } = useToast();

  const handleCopy = () => {
    if (videoIdea) {
      navigator.clipboard.writeText(videoIdea);
      toast({
        title: "تم النسخ",
        description: "تم نسخ فكرة الفيديو إلى الحافظة",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">فكرة الفيديو</h3>
        {videoIdea && (
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="ml-1 h-3 w-3" />
            نسخ
          </Button>
        )}
      </div>
      
      <div className={`border rounded-md p-3 bg-muted/20 h-[350px] overflow-y-auto ${!videoIdea && !errorMessage && 'flex items-center justify-center'}`}>
        {errorMessage ? (
          <div className="text-sm text-destructive">{errorMessage}</div>
        ) : videoIdea ? (
          <div className="text-sm whitespace-pre-wrap">{videoIdea}</div>
        ) : (
          <p className="text-muted-foreground text-center">فكرة الفيديو ستظهر هنا</p>
        )}
      </div>
    </div>
  );
};

export default VideoIdeaDisplay;
