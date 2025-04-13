
import React, { useState } from "react";
import { Upload, Sparkles, RotateCw, Check, ImageOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface AnalysisResult {
  objectsDetected: string[];
  colors: {
    name: string;
    hex: string;
    percentage: number;
  }[];
  tags: string[];
  composition: {
    type: string;
    description: string;
    quality: "high" | "medium" | "low";
  };
  lighting: {
    type: string;
    quality: "good" | "moderate" | "poor";
  };
}

const AutoImageAnalyzer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  // Mock function to simulate image analysis with AI
  const analyzeImage = (imageUrl: string): Promise<AnalysisResult> => {
    return new Promise((resolve) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 5;
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          
          // Return mock analysis result
          resolve({
            objectsDetected: ["منتج تجميل", "عبوة كريم", "غطاء أبيض"],
            colors: [
              { name: "أبيض", hex: "#FFFFFF", percentage: 45 },
              { name: "وردي فاتح", hex: "#F8C8DC", percentage: 30 },
              { name: "أزرق فاتح", hex: "#E0F0FF", percentage: 15 },
              { name: "ذهبي", hex: "#FFD700", percentage: 10 },
            ],
            tags: ["منتج العناية بالبشرة", "كريم ترطيب", "تصميم أنيق", "عبوة فاخرة"],
            composition: {
              type: "مركزية",
              description: "المنتج في المركز مع خلفية متدرجة، تكوين متوازن",
              quality: "high"
            },
            lighting: {
              type: "ناعم",
              quality: "good"
            }
          });
        }
      }, 100);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setSelectedImage(url);
    setAnalysisResult(null);
    setProgress(0);
  };

  const handleAnalysis = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    setProgress(0);
    
    try {
      const result = await analyzeImage(selectedImage);
      setAnalysisResult(result);

      toast({
        title: "تم التحليل بنجاح",
        description: "تم تحليل الصورة وتحديد المكونات والخصائص",
      });
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "لم يتم تحليل الصورة بنجاح. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
      setAnalyzing(false);
    }
  };

  const getQualityColor = (quality: "high" | "medium" | "low" | "good" | "moderate" | "poor") => {
    switch (quality) {
      case "high":
      case "good":
        return "bg-green-100 text-green-800";
      case "medium":
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "low":
      case "poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">محرك التحليل التلقائي للصور</CardTitle>
          <CardDescription>
            رفع وتحليل صور المنتجات باستخدام الذكاء الاصطناعي
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                {selectedImage ? (
                  <div className="relative">
                    <img 
                      src={selectedImage} 
                      alt="Preview" 
                      className="w-full h-auto max-h-[300px] object-contain rounded-md mx-auto"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-4 absolute top-2 right-2 bg-background/80 hover:bg-background"
                      onClick={() => {
                        setSelectedImage(null);
                        setAnalysisResult(null);
                        setProgress(0);
                      }}
                    >
                      تغيير الصورة
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center h-[300px]">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground mb-1">انقر لتحميل صورة للتحليل</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG (الحد الأقصى 5 ميجابايت)</p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>

              {selectedImage && (
                <Button 
                  className="w-full"
                  onClick={handleAnalysis}
                  disabled={analyzing || !!analysisResult}
                >
                  {analyzing ? (
                    <>
                      <RotateCw className="h-4 w-4 ml-2 animate-spin" />
                      جاري التحليل...
                    </>
                  ) : analysisResult ? (
                    <>
                      <Check className="h-4 w-4 ml-2" />
                      تم التحليل
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 ml-2" />
                      تحليل الصورة
                    </>
                  )}
                </Button>
              )}

              {analyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>جاري تحليل الصورة...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </div>

            <div className="md:w-1/2">
              {analyzing ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="h-[350px] flex flex-col items-center justify-center">
                      <RotateCw className="h-10 w-10 animate-spin text-muted-foreground mb-3" />
                      <p className="mb-2 font-medium">جاري تحليل الصورة</p>
                      <p className="text-sm text-muted-foreground mb-4">يتم استخراج المعلومات باستخدام الذكاء الاصطناعي</p>
                      <Progress value={progress} className="h-2 w-full max-w-xs" />
                    </div>
                  </CardContent>
                </Card>
              ) : !selectedImage ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="h-[350px] flex flex-col items-center justify-center">
                      <ImageOff className="h-12 w-12 text-muted-foreground mb-3" />
                      <p className="mb-1 font-medium">لا توجد صورة</p>
                      <p className="text-sm text-muted-foreground text-center">
                        قم بتحميل صورة من الجانب الأيسر لبدء عملية التحليل التلقائي
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : analysisResult ? (
                <Card className="overflow-auto max-h-[400px]">
                  <CardHeader>
                    <CardTitle className="text-lg">نتائج التحليل</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">العناصر المكتشفة:</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.objectsDetected.map((object, index) => (
                          <Badge key={index} variant="outline">
                            {object}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-2">الألوان الأساسية:</h4>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {analysisResult.colors.map((color, index) => (
                            <div 
                              key={index}
                              className="w-8 h-8 rounded-full border"
                              style={{ backgroundColor: color.hex }}
                              title={`${color.name} - ${color.hex}`}
                            />
                          ))}
                        </div>
                        {analysisResult.colors.map((color, index) => (
                          <div key={index} className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-sm mr-2" 
                              style={{ backgroundColor: color.hex }}
                            />
                            <p className="text-sm flex-1">
                              {color.name} <span className="text-muted-foreground text-xs">({color.hex})</span>
                            </p>
                            <p className="text-sm font-medium">{color.percentage}%</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-2">التسميات المقترحة:</h4>
                      <div className="flex flex-wrap gap-1">
                        {analysisResult.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">التكوين:</h4>
                        <div className="space-y-1">
                          <div className="flex items-center mb-1">
                            <Badge variant="outline" className={getQualityColor(analysisResult.composition.quality)}>
                              {analysisResult.composition.quality === "high" ? "عالي" : 
                               analysisResult.composition.quality === "medium" ? "متوسط" : "منخفض"}
                            </Badge>
                            <span className="text-sm mr-2">{analysisResult.composition.type}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{analysisResult.composition.description}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">الإضاءة:</h4>
                        <div className="flex items-center">
                          <Badge variant="outline" className={getQualityColor(analysisResult.lighting.quality)}>
                            {analysisResult.lighting.quality === "good" ? "جيدة" : 
                             analysisResult.lighting.quality === "moderate" ? "متوسطة" : "ضعيفة"}
                          </Badge>
                          <span className="text-sm mr-2">{analysisResult.lighting.type}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <div className="h-[350px] flex flex-col items-center justify-center">
                      <Sparkles className="h-10 w-10 text-muted-foreground mb-3" />
                      <p className="font-medium mb-2">صورة جاهزة للتحليل</p>
                      <p className="text-sm text-muted-foreground text-center">
                        انقر على زر "تحليل الصورة" لبدء التحليل التلقائي باستخدام الذكاء الاصطناعي
                      </p>
                      <Button 
                        className="mt-4"
                        onClick={handleAnalysis}
                      >
                        <Sparkles className="h-4 w-4 ml-2" />
                        تحليل الصورة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoImageAnalyzer;
