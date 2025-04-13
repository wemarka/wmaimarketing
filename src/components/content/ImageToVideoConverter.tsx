
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Loader2, Image, Video, Download, RotateCw, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ImageToVideoConverter: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [videoGenerating, setVideoGenerating] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [duration, setDuration] = useState([5]);
  const [selectedTemplate, setSelectedTemplate] = useState("zoom");
  
  const [videoSettings, setVideoSettings] = useState({
    title: "",
    subtitle: "",
    cta: "اطلبيه الآن",
  });
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setImageUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        setSelectedImage(URL.createObjectURL(file));
        setImageUploading(false);
        
        toast({
          title: "تم رفع الصورة",
          description: "تم تحميل الصورة بنجاح",
        });
      }, 1500);
    }
  };
  
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setVideoGenerated(false);
  };
  
  const handleGenerateVideo = () => {
    if (!selectedImage) {
      toast({
        title: "لا توجد صورة محددة",
        description: "يرجى اختيار صورة أولاً",
        variant: "destructive",
      });
      return;
    }
    
    setVideoGenerating(true);
    
    // Simulate video generation delay
    setTimeout(() => {
      setVideoGenerating(false);
      setVideoGenerated(true);
      
      toast({
        title: "تم إنشاء الفيديو",
        description: "تم إنشاء الفيديو بنجاح",
      });
    }, 3000);
  };
  
  const handleInputChange = (field: string, value: string) => {
    setVideoSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">تحويل الصورة إلى فيديو</h2>
          <p className="text-muted-foreground mb-4">
            تحويل صور المنتجات إلى فيديوهات قصيرة مع تأثيرات حركة وعناصر مميزة
          </p>
          
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            {!selectedImage ? (
              <>
                <label htmlFor="image-upload" className="block cursor-pointer">
                  <div className="flex flex-col items-center justify-center py-8">
                    {imageUploading ? (
                      <Loader2 className="h-10 w-10 text-muted-foreground animate-spin mb-2" />
                    ) : (
                      <Image className="h-10 w-10 text-muted-foreground mb-2" />
                    )}
                    <p className="mb-1 font-medium">اختر صورة أو اسحبها هنا</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG أو WEBP</p>
                  </div>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                  />
                </label>
              </>
            ) : (
              <>
                <AspectRatio ratio={1 / 1} className="overflow-hidden rounded-md">
                  <img
                    src={selectedImage}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm" onClick={handleRemoveImage}>
                    تغيير الصورة
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-2">إعدادات الفيديو</h3>
          
          <div className="space-y-2">
            <Label htmlFor="template">قالب الفيديو</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="اختر قالبًا" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zoom">تكبير وتصغير</SelectItem>
                <SelectItem value="pan">تحريك أفقي</SelectItem>
                <SelectItem value="rotate">دوران</SelectItem>
                <SelectItem value="bounce">حركة نطاطة</SelectItem>
                <SelectItem value="slide">انزلاق</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="duration">مدة الفيديو</Label>
              <span className="text-muted-foreground text-sm">{duration[0]} ثوانٍ</span>
            </div>
            <Slider
              id="duration"
              min={3}
              max={15}
              step={1}
              value={duration}
              onValueChange={setDuration}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">عنوان المنتج</Label>
            <Input
              id="title"
              placeholder="مثال: كريم الترطيب الفائق"
              value={videoSettings.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subtitle">وصف مختصر</Label>
            <Input
              id="subtitle"
              placeholder="مثال: ترطيب 24 ساعة"
              value={videoSettings.subtitle}
              onChange={(e) => handleInputChange("subtitle", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cta">نص الدعوة للإجراء</Label>
            <Input
              id="cta"
              placeholder="مثال: اطلبي الآن"
              value={videoSettings.cta}
              onChange={(e) => handleInputChange("cta", e.target.value)}
            />
          </div>
          
          <Button 
            className="w-full mt-4"
            onClick={handleGenerateVideo}
            disabled={!selectedImage || videoGenerating}
          >
            {videoGenerating ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                جارِ إنشاء الفيديو...
              </>
            ) : (
              <>
                <Video className="mr-2 h-4 w-4" />
                إنشاء الفيديو
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">معاينة الفيديو</h2>
        
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
                            selectedTemplate === "rotate" ? "animate-slow-spin" :
                            selectedTemplate === "bounce" ? "animate-bounce" :
                            "animate-slide-in"}`}
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
        
        {videoGenerated && (
          <div className="mt-6">
            <h3 className="font-medium mb-3">قوالب مقترحة</h3>
            <div className="grid grid-cols-3 gap-3">
              {["zoom", "pan", "rotate"].map((template) => (
                <Card 
                  key={template}
                  className={`cursor-pointer overflow-hidden ${selectedTemplate === template ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <AspectRatio ratio={1 / 1}>
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt={template}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </AspectRatio>
                  <CardContent className="p-2">
                    <p className="text-xs font-medium text-center">
                      {template === "zoom" ? "تكبير" : 
                       template === "pan" ? "تحريك" : "دوران"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToVideoConverter;
