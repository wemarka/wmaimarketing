
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

interface VideoIdeaDisplayProps {
  videoIdea: string | null;
  errorMessage: string | null;
}

const VideoIdeaDisplay: React.FC<VideoIdeaDisplayProps> = ({
  videoIdea,
  errorMessage
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleCopy = () => {
    if (videoIdea) {
      navigator.clipboard.writeText(videoIdea);
      toast({
        title: t("aiStudio.videoIdeas.copied"),
        description: t("aiStudio.videoIdeas.copiedDescription"),
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{t("aiStudio.videoIdeas.ideaTitle")}</h3>
        {videoIdea && (
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className={`${t("common.textDirection") === "rtl" ? "ml-1" : "mr-1"} h-3 w-3`} />
            {t("aiStudio.common.copy")}
          </Button>
        )}
      </div>
      
      <div className={`border rounded-md p-3 bg-muted/20 h-[350px] overflow-y-auto ${!videoIdea && !errorMessage && 'flex items-center justify-center'}`}>
        {errorMessage ? (
          <div className="text-sm text-destructive">{errorMessage}</div>
        ) : videoIdea ? (
          <div className="text-sm whitespace-pre-wrap">{videoIdea}</div>
        ) : (
          <p className="text-muted-foreground text-center">{t("aiStudio.videoIdeas.placeholder")}</p>
        )}
      </div>
    </div>
  );
};

export default VideoIdeaDisplay;
