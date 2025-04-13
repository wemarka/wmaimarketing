
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Download, Image as ImageIcon, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-beauty-purple" />
          إنشاء صور بالذكاء الاصطناعي
        </CardTitle>
        <CardDescription>إنشاء صور جذابة لمنتجات التجميل باستخدام تقنية DALL-E 3</CardDescription>
      </CardHeader>
      <CardContent>
        {errorMessage && errorMessage.includes("billing") && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>خطأ في مفتاح API</AlertTitle>
            <AlertDescription>
              مفتاح OpenAI API غير صالح أو استنفد الرصيد المتاح. يرجى التحقق من حساب OpenAI الخاص بك وتحديث المفتاح.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium mb-2">
                وصف الصورة
              </label>
              <Textarea
                id="prompt"
                placeholder="صف الصورة التي تريد إنشاؤها، مثال: صورة لزجاجة مستحضر عناية بالبشرة على خلفية زهرية..."
                className="resize-none h-[100px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  حجم الصورة
                </label>
                <Select value={size} onValueChange={(value) => setSize(value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحجم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1024x1024">مربع (1:1)</SelectItem>
                    <SelectItem value="1024x1792">عمودي (9:16)</SelectItem>
                    <SelectItem value="1792x1024">أفقي (16:9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  أسلوب الصورة
                </label>
                <Select value={style} onValueChange={(value) => setStyle(value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الأسلوب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="glamour">فاخر وأنيق</SelectItem>
                    <SelectItem value="natural">طبيعي</SelectItem>
                    <SelectItem value="vibrant">نابض بالحياة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageGenerator;
