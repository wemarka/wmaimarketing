
import React, { useState } from "react";
import { Upload, Sparkles, RotateCw, Check, ImageOff, ZoomIn, Save, Layers, PanelLeftOpen, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  productInfo?: {
    category: string;
    type: string;
    features: string[];
    bestUses: string[];
    similarProducts: string[];
  };
  imageQuality: {
    resolution: string;
    sharpness: "high" | "medium" | "low";
    noise: "low" | "moderate" | "high";
  };
  anglesAndPerspective: {
    primaryView: string;
    angleType: string;
    perspective: string;
    depthQuality: "good" | "moderate" | "poor";
  };
  detailedAnalysis: {
    textureClarity: "excellent" | "good" | "fair" | "poor";
    detailVisibility: "excellent" | "good" | "fair" | "poor";
    shadowDetails: "well-defined" | "moderate" | "poor";
    reflectionHandling: "excellent" | "good" | "fair" | "poor";
  };
}

interface ProductCategory {
  id: string;
  name: string;
  subcategories: string[];
}

const productCategories: ProductCategory[] = [
  {
    id: "skincare",
    name: "منتجات العناية بالبشرة",
    subcategories: ["الكريمات المرطبة", "واقي الشمس", "سيروم", "ماسك", "منظف", "تونر"]
  },
  {
    id: "makeup",
    name: "منتجات المكياج",
    subcategories: ["أحمر شفاه", "ماسكارا", "أساس", "كونسيلر", "أحمر خدود", "ظلال عيون"]
  },
  {
    id: "haircare",
    name: "منتجات العناية بالشعر",
    subcategories: ["شامبو", "بلسم", "ماسك شعر", "سيروم شعر", "زيت شعر", "بخاخ تصفيف"]
  },
  {
    id: "bodycare",
    name: "منتجات العناية بالجسم",
    subcategories: ["كريم جسم", "غسول", "مقشر", "زيت جسم", "مزيل عرق", "معطر جسم"]
  }
];

const AutoImageAnalyzer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [detailsTab, setDetailsTab] = useState("basic");
  const [zoomFactor, setZoomFactor] = useState(1);
  const [showProductClassification, setShowProductClassification] = useState(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
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
            },
            productInfo: {
              category: "skincare",
              type: "كريم ترطيب",
              features: ["مرطب عميق", "مضاد للأكسدة", "مناسب للبشرة الجافة"],
              bestUses: ["استخدام يومي", "قبل النوم", "بعد غسل البشرة"],
              similarProducts: ["كريم ترطيب فائق", "كريم مضاد للشيخوخة", "كريم ليلي مغذي"]
            },
            imageQuality: {
              resolution: "عالية (2000 × 2000 بكسل)",
              sharpness: "high",
              noise: "low"
            },
            anglesAndPerspective: {
              primaryView: "أمامي",
              angleType: "مباشر",
              perspective: "مستوية",
              depthQuality: "good"
            },
            detailedAnalysis: {
              textureClarity: "excellent",
              detailVisibility: "good",
              shadowDetails: "well-defined",
              reflectionHandling: "good"
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
    setShowProductClassification(false);
    setSelectedProductCategory(null);
    setSelectedSubcategory(null);
  };

  const handleAnalysis = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    setProgress(0);
    
    try {
      const result = await analyzeImage(selectedImage);
      setAnalysisResult(result);

      // Auto-select product category if detected
      if (result.productInfo?.category) {
        setSelectedProductCategory(result.productInfo.category);
        setShowProductClassification(true);
      }

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

  const handleSaveToLibrary = () => {
    if (!selectedImage || !analysisResult) return;
    
    toast({
      title: "تم الحفظ في المكتبة",
      description: "تم حفظ الصورة والبيانات التحليلية في مكتبة الأصول",
    });
  };

  const getQualityColor = (quality: "high" | "medium" | "low" | "good" | "moderate" | "poor" | "excellent" | "fair" | "well-defined") => {
    switch (quality) {
      case "high":
      case "good":
      case "excellent":
      case "well-defined":
        return "bg-green-100 text-green-800";
      case "medium":
      case "moderate":
      case "fair":
        return "bg-yellow-100 text-yellow-800";
      case "low":
      case "poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleProductClassificationSave = () => {
    if (!selectedProductCategory) return;
    
    // Update the analysis result with the manually selected category
    if (analysisResult) {
      const updatedResult = {
        ...analysisResult,
        productInfo: {
          ...analysisResult.productInfo,
          category: selectedProductCategory,
          type: selectedSubcategory || analysisResult.productInfo?.type || ""
        }
      };
      
      setAnalysisResult(updatedResult);
      setShowProductClassification(false);
      
      toast({
        title: "تم تحديث التصنيف",
        description: "تم حفظ تصنيف المنتج بنجاح",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">محرك التحليل التلقائي المتقدم للصور</CardTitle>
          <CardDescription>
            رفع وتحليل صور المنتجات باستخدام تقنيات الذكاء الاصطناعي المتقدمة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                {selectedImage ? (
                  <div className="relative">
                    <div className="overflow-auto max-h-[300px]">
                      <img 
                        src={selectedImage} 
                        alt="Preview" 
                        className="w-full h-auto object-contain rounded-md mx-auto transform transition-transform duration-300"
                        style={{ transform: `scale(${zoomFactor})` }}
                      />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-background/80 rounded-lg p-2 flex items-center space-x-2">
                      <ZoomIn className="h-4 w-4" />
                      <Slider
                        className="w-24"
                        min={1}
                        max={3}
                        step={0.1}
                        value={[zoomFactor]}
                        onValueChange={(value) => setZoomFactor(value[0])}
                      />
                    </div>
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
                <div className="flex gap-2">
                  {analysisResult ? (
                    <>
                      <Button 
                        variant="outline"
                        onClick={() => handleAnalysis()}
                        className="flex-1"
                      >
                        <Sparkles className="h-4 w-4 ml-2" />
                        إعادة التحليل
                      </Button>
                      <Button 
                        onClick={() => handleSaveToLibrary()}
                        className="flex-1"
                      >
                        <Save className="h-4 w-4 ml-2" />
                        حفظ في المكتبة
                      </Button>
                    </>
                  ) : (
                    <Button 
                      className="w-full"
                      onClick={handleAnalysis}
                      disabled={analyzing}
                    >
                      {analyzing ? (
                        <>
                          <RotateCw className="h-4 w-4 ml-2 animate-spin" />
                          جاري التحليل...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 ml-2" />
                          تحليل الصورة
                        </>
                      )}
                    </Button>
                  )}
                </div>
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
              
              {/* Product Classification Dialog */}
              <Dialog open={showProductClassification} onOpenChange={setShowProductClassification}>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>تصنيف المنتج</DialogTitle>
                    <DialogDescription>
                      حدد فئة المنتج وتصنيفه الفرعي للحصول على نتائج تحليل أكثر دقة
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">فئة المنتج</label>
                      <Select value={selectedProductCategory || ""} onValueChange={setSelectedProductCategory}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="اختر فئة المنتج" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedProductCategory && (
                      <div>
                        <label className="block text-sm font-medium mb-1">التصنيف الفرعي</label>
                        <Select value={selectedSubcategory || ""} onValueChange={setSelectedSubcategory}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="اختر التصنيف الفرعي" />
                          </SelectTrigger>
                          <SelectContent>
                            {productCategories
                              .find(cat => cat.id === selectedProductCategory)
                              ?.subcategories.map((subcat, idx) => (
                                <SelectItem key={idx} value={subcat}>
                                  {subcat}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowProductClassification(false)}>
                        إلغاء
                      </Button>
                      <Button onClick={handleProductClassificationSave}>
                        حفظ التصنيف
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                <Card className="overflow-auto max-h-[600px]">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">نتائج التحليل المتقدم</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowProductClassification(true)}
                      >
                        <Tag className="h-4 w-4 ml-2" />
                        تصنيف المنتج
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs value={detailsTab} onValueChange={setDetailsTab} className="w-full">
                      <div className="border-b px-6">
                        <TabsList className="mb-0">
                          <TabsTrigger value="basic">أساسي</TabsTrigger>
                          <TabsTrigger value="advanced">متقدم</TabsTrigger>
                          <TabsTrigger value="product">معلومات المنتج</TabsTrigger>
                          <TabsTrigger value="quality">جودة الصورة</TabsTrigger>
                        </TabsList>
                      </div>
                      
                      <div className="p-6">
                        <TabsContent value="basic" className="m-0 space-y-4">
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
                                    className="w-3 h-3 rounded-sm ml-2" 
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
                        </TabsContent>
                        
                        <TabsContent value="advanced" className="m-0 space-y-4">
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
                          
                          <Separator />
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">الزوايا والمنظور:</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">العرض الأساسي:</p>
                                <p className="text-sm font-medium">{analysisResult.anglesAndPerspective.primaryView}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">نوع الزاوية:</p>
                                <p className="text-sm font-medium">{analysisResult.anglesAndPerspective.angleType}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">المنظور:</p>
                                <p className="text-sm font-medium">{analysisResult.anglesAndPerspective.perspective}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">جودة العمق:</p>
                                <Badge variant="outline" className={getQualityColor(analysisResult.anglesAndPerspective.depthQuality)}>
                                  {analysisResult.anglesAndPerspective.depthQuality === "good" ? "جيدة" : 
                                   analysisResult.anglesAndPerspective.depthQuality === "moderate" ? "متوسطة" : "ضعيفة"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">تحليل التفاصيل:</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">وضوح القوام:</p>
                                <Badge variant="outline" className={getQualityColor(analysisResult.detailedAnalysis.textureClarity)}>
                                  {analysisResult.detailedAnalysis.textureClarity === "excellent" ? "ممتاز" : 
                                   analysisResult.detailedAnalysis.textureClarity === "good" ? "جيد" : 
                                   analysisResult.detailedAnalysis.textureClarity === "fair" ? "مقبول" : "ضعيف"}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">وضوح التفاصيل:</p>
                                <Badge variant="outline" className={getQualityColor(analysisResult.detailedAnalysis.detailVisibility)}>
                                  {analysisResult.detailedAnalysis.detailVisibility === "excellent" ? "ممتاز" : 
                                   analysisResult.detailedAnalysis.detailVisibility === "good" ? "جيد" : 
                                   analysisResult.detailedAnalysis.detailVisibility === "fair" ? "مقبول" : "ضعيف"}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">تفاصيل الظلال:</p>
                                <Badge variant="outline" className={getQualityColor(analysisResult.detailedAnalysis.shadowDetails)}>
                                  {analysisResult.detailedAnalysis.shadowDetails === "well-defined" ? "محددة جيدًا" : 
                                   analysisResult.detailedAnalysis.shadowDetails === "moderate" ? "متوسطة" : "ضعيفة"}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">معالجة الانعكاسات:</p>
                                <Badge variant="outline" className={getQualityColor(analysisResult.detailedAnalysis.reflectionHandling)}>
                                  {analysisResult.detailedAnalysis.reflectionHandling === "excellent" ? "ممتاز" : 
                                   analysisResult.detailedAnalysis.reflectionHandling === "good" ? "جيد" : 
                                   analysisResult.detailedAnalysis.reflectionHandling === "fair" ? "مقبول" : "ضعيف"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="product" className="m-0 space-y-4">
                          {analysisResult.productInfo ? (
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">فئة المنتج:</p>
                                  <p className="text-sm font-medium">
                                    {productCategories.find(c => c.id === analysisResult.productInfo?.category)?.name || analysisResult.productInfo?.category}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">نوع المنتج:</p>
                                  <p className="text-sm font-medium">{analysisResult.productInfo?.type}</p>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div>
                                <h4 className="text-sm font-medium mb-2">سمات المنتج:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {analysisResult.productInfo?.features.map((feature, index) => (
                                    <Badge key={index} variant="outline">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div>
                                <h4 className="text-sm font-medium mb-2">أفضل استخدامات:</h4>
                                <ul className="list-disc list-inside space-y-1">
                                  {analysisResult.productInfo?.bestUses.map((use, index) => (
                                    <li key={index} className="text-sm">{use}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <Separator />
                              
                              <div>
                                <h4 className="text-sm font-medium mb-2">منتجات مشابهة:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {analysisResult.productInfo?.similarProducts.map((product, index) => (
                                    <Badge key={index} variant="secondary">
                                      {product}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-40">
                              <p className="text-sm text-muted-foreground">لا توجد معلومات عن المنتج</p>
                              <Button 
                                className="mt-2" 
                                variant="outline" 
                                size="sm"
                                onClick={() => setShowProductClassification(true)}
                              >
                                إضافة معلومات المنتج
                              </Button>
                            </div>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="quality" className="m-0 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">الدقة:</p>
                              <p className="text-sm font-medium">{analysisResult.imageQuality.resolution}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">الحدة:</p>
                              <Badge variant="outline" className={getQualityColor(analysisResult.imageQuality.sharpness)}>
                                {analysisResult.imageQuality.sharpness === "high" ? "عالية" : 
                                 analysisResult.imageQuality.sharpness === "medium" ? "متوسطة" : "منخفضة"}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">التشويش:</p>
                              <Badge variant="outline" className={getQualityColor(
                                analysisResult.imageQuality.noise === "low" ? "high" : 
                                analysisResult.imageQuality.noise === "moderate" ? "medium" : "low"
                              )}>
                                {analysisResult.imageQuality.noise === "low" ? "منخفض" : 
                                 analysisResult.imageQuality.noise === "moderate" ? "متوسط" : "عالي"}
                              </Badge>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">توصيات لتحسين الصورة:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {analysisResult.imageQuality.sharpness !== "high" && (
                                <li>زيادة حدة الصورة لتحسين وضوح التفاصيل</li>
                              )}
                              {analysisResult.imageQuality.noise !== "low" && (
                                <li>تقليل مستوى التشويش في الصورة</li>
                              )}
                              {analysisResult.lighting.quality !== "good" && (
                                <li>تحسين الإضاءة للحصول على صورة أكثر وضوحًا</li>
                              )}
                              {analysisResult.composition.quality !== "high" && (
                                <li>تحسين تكوين الصورة بوضع المنتج في المركز</li>
                              )}
                              {analysisResult.detailedAnalysis.reflectionHandling !== "excellent" && (
                                <li>تقليل الانعكاسات على سطح المنتج</li>
                              )}
                              <li>استخدام خلفية أكثر تباينًا مع المنتج</li>
                            </ul>
                          </div>
                        </TabsContent>
                      </div>
                    </Tabs>
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
