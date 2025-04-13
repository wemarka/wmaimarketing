
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { AlertCircle, Download, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImagePreviewProps {
  isLoading: boolean;
  errorMessage: string | null;
  generatedImage: string | null;
  size: "1024x1024" | "1024x1792" | "1792x1024";
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  isLoading,
  errorMessage,
  generatedImage,
  size
}) => {
  const { toast } = useToast();

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `ai-image-${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "تم التحميل",
        description: "تم تحميل الصورة بنجاح",
      });
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium mb-2">
        معاينة الصورة
      </label>
      
      <div className="border rounded-md overflow-hidden">
        <AspectRatio ratio={size === "1024x1024" ? 1 : size === "1024x1792" ? 9/16 : 16/9}>
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-muted/20">
              <Loader2 className="h-8 w-8 animate-spin mb-2 text-beauty-purple" />
              <p className="text-sm text-muted-foreground">جارٍ إنشاء الصورة...</p>
            </div>
          ) : errorMessage ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-muted/20 p-4">
              <AlertCircle className="h-8 w-8 text-destructive mb-2" />
              <p className="text-sm text-destructive text-center">{errorMessage}</p>
            </div>
          ) : generatedImage ? (
            <img 
              src={generatedImage} 
              alt="صورة منشأة بواسطة الذكاء الاصطناعي" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/20">
              <p className="text-sm text-muted-foreground">الصورة المنشأة ستظهر هنا</p>
            </div>
          )}
        </AspectRatio>
      </div>
      
      {generatedImage && (
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleDownload}
        >
          <Download className="ml-2 h-4 w-4" />
          تحميل الصورة
        </Button>
      )}
    </div>
  );
};

export default ImagePreview;
