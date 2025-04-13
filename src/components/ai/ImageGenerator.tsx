
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ImageIcon, Loader2, RefreshCw } from "lucide-react";
import ImagePromptForm from "./image-generator/ImagePromptForm";
import ImagePreview from "./image-generator/ImagePreview";
import ErrorAlert from "./image-generator/ErrorAlert";

interface ImageGeneratorProps {
  onImageGenerated?: (imageUrl: string) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState<"1024x1024" | "1024x1792" | "1792x1024">("1024x1024");
  const [style, setStyle] = useState<"glamour" | "natural" | "vibrant">("glamour");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "الوصف مطلوب",
        description: "يرجى إدخال وصف لإنشاء الصورة",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-image-generator', {
        body: { prompt, size, style }
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
        setGeneratedImage(data.imageUrl);
        
        if (onImageGenerated) {
          onImageGenerated(data.imageUrl);
        }
        
        toast({
          title: "تم إنشاء الصورة",
          description: "تم إنشاء الصورة بنجاح باستخدام الذكاء الاصطناعي",
        });
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setErrorMessage(error instanceof Error ? error.message : 'حدث خطأ غير متوقع');
      toast({
        title: "خطأ",
        description: `حدث خطأ أثناء إنشاء الصورة: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
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
          <ImageIcon className="h-5 w-5 text-beauty-purple" />
          إنشاء صور بالذكاء الاصطناعي
        </CardTitle>
        <CardDescription>إنشاء صور جذابة لمنتجات التجميل باستخدام تقنية DALL-E 3</CardDescription>
      </CardHeader>
      <CardContent>
        <ErrorAlert errorMessage={errorMessage} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ImagePromptForm 
              prompt={prompt}
              setPrompt={setPrompt}
              size={size}
              setSize={setSize}
              style={style}
              setStyle={setStyle}
            />
            
            <Button 
              onClick={generateImage} 
              className="w-full"
              disabled={isLoading || !prompt.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جارٍ إنشاء الصورة...
                </>
              ) : (
                <>
                  <RefreshCw className="ml-2 h-4 w-4" />
                  إنشاء الصورة
                </>
              )}
            </Button>
          </div>
          
          <ImagePreview 
            isLoading={isLoading}
            errorMessage={errorMessage}
            generatedImage={generatedImage}
            size={size}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageGenerator;
