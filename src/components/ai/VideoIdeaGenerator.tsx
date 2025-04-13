
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Video } from "lucide-react";
import VideoIdeaForm from "./video-ideas/VideoIdeaForm";
import VideoIdeaDisplay from "./video-ideas/VideoIdeaDisplay";
import ErrorAlert from "./image-generator/ErrorAlert";

const VideoIdeaGenerator = () => {
  const [productType, setProductType] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [duration, setDuration] = useState("15-30");
  const [style, setStyle] = useState("عصري وجذاب");
  const [isLoading, setIsLoading] = useState(false);
  const [videoIdea, setVideoIdea] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const generateVideoIdea = async () => {
    if (!productType) {
      toast({
        title: "نوع المنتج مطلوب",
        description: "يرجى إدخال نوع المنتج",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-video-ideas', {
        body: { productType, platform, duration, style }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        setErrorMessage(data.error);
        toast({
          title: "خطأ",
          description: data.error,
          variant: "destructive"
        });
      } else {
        setVideoIdea(data.videoIdea);
        toast({
          title: "تم إنشاء فكرة الفيديو",
          description: "تم إنشاء فكرة فيديو جديدة بنجاح",
        });
      }
    } catch (error) {
      console.error("Error generating video idea:", error);
      setErrorMessage(error instanceof Error ? error.message : 'حدث خطأ غير متوقع');
      toast({
        title: "خطأ",
        description: `حدث خطأ أثناء إنشاء فكرة الفيديو: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-beauty-purple" />
          مولد أفكار الفيديو
        </CardTitle>
        <CardDescription>إنشاء أفكار إبداعية لفيديوهات تسويقية لمنتجات التجميل</CardDescription>
      </CardHeader>
      <CardContent>
        <ErrorAlert errorMessage={errorMessage} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VideoIdeaForm 
            productType={productType}
            setProductType={setProductType}
            platform={platform}
            setPlatform={setPlatform}
            duration={duration}
            setDuration={setDuration}
            style={style}
            setStyle={setStyle}
            isLoading={isLoading}
            generateVideoIdea={generateVideoIdea}
          />
          
          <VideoIdeaDisplay 
            videoIdea={videoIdea}
            errorMessage={errorMessage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoIdeaGenerator;
