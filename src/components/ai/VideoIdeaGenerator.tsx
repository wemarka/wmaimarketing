
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Video, Loader2, AlertCircle, Copy } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-beauty-purple" />
          مولد أفكار الفيديو
        </CardTitle>
        <CardDescription>إنشاء أفكار إبداعية لفيديوهات تسويقية لمنتجات التجميل</CardDescription>
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
              <label className="block text-sm font-medium mb-2">
                نوع المنتج
              </label>
              <Input
                placeholder="مثال: كريم مرطب للوجه"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                المنصة
              </label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنصة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Instagram">انستغرام</SelectItem>
                  <SelectItem value="TikTok">تيك توك</SelectItem>
                  <SelectItem value="YouTube">يوتيوب</SelectItem>
                  <SelectItem value="Facebook">فيسبوك</SelectItem>
                  <SelectItem value="Snapchat">سناب شات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                مدة الفيديو (بالثواني)
              </label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المدة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15-30">15-30 ثانية</SelectItem>
                  <SelectItem value="30-60">30-60 ثانية</SelectItem>
                  <SelectItem value="60-90">60-90 ثانية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                أسلوب الفيديو
              </label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الأسلوب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="عصري وجذاب">عصري وجذاب</SelectItem>
                  <SelectItem value="احترافي وتعليمي">احترافي وتعليمي</SelectItem>
                  <SelectItem value="عاطفي وملهم">عاطفي وملهم</SelectItem>
                  <SelectItem value="مرح وممتع">مرح وممتع</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={generateVideoIdea} 
              className="w-full"
              disabled={isLoading || !productType.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جارٍ إنشاء فكرة الفيديو...
                </>
              ) : (
                <>
                  <Video className="ml-2 h-4 w-4" />
                  إنشاء فكرة فيديو
                </>
              )}
            </Button>
          </div>
          
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
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoIdeaGenerator;
