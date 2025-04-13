
import React, { useState } from "react";
import { Upload, Palette, Loader2, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ColorData {
  hex: string;
  name: string;
  percentage: number;
}

const ImageColorAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [colors, setColors] = useState<ColorData[]>([]);
  const { toast } = useToast();

  // This is a mock function to simulate color extraction
  // In a real application, you'd use a color extraction library or API
  const extractColors = (imageUrl: string): Promise<ColorData[]> => {
    return new Promise((resolve) => {
      // Simulate processing time
      setTimeout(() => {
        // Sample color data - in a real app this would be dynamically generated
        resolve([
          { hex: "#E53F71", name: "وردي غامق", percentage: 35 },
          { hex: "#FFA69E", name: "وردي فاتح", percentage: 25 },
          { hex: "#95B8D1", name: "أزرق فاتح", percentage: 15 },
          { hex: "#FFFFFF", name: "أبيض", percentage: 15 },
          { hex: "#101820", name: "أسود", percentage: 10 },
        ]);
      }, 2000);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setSelectedImage(url);
    setColors([]);
  };

  const handleAnalysis = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    try {
      const extractedColors = await extractColors(selectedImage);
      setColors(extractedColors);

      toast({
        title: "تم التحليل بنجاح",
        description: "تم استخراج الألوان الرئيسية من الصورة",
      });
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "لم يتم استخراج الألوان بنجاح. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
    setAnalyzing(false);
  };

  const downloadColorPalette = () => {
    // In a real app, you'd generate a color palette image
    // For now, we'll just create a text file with the color data
    const colorsText = colors
      .map(color => `${color.name}: ${color.hex} (${color.percentage}%)`)
      .join('\n');
    
    const blob = new Blob([colorsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.txt';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "تم التحميل",
      description: "تم تحميل بيانات الألوان بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">تحليل ألوان الصور</CardTitle>
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
                      onClick={() => setSelectedImage(null)}
                    >
                      تغيير الصورة
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center h-[300px]">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground mb-1">انقر لتحميل صورة</p>
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
                  disabled={analyzing || colors.length > 0}
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      جاري التحليل...
                    </>
                  ) : colors.length > 0 ? (
                    <>
                      <Palette className="h-4 w-4 mr-2" />
                      تم التحليل
                    </>
                  ) : (
                    <>
                      <Palette className="h-4 w-4 mr-2" />
                      تحليل الألوان
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="md:w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">الألوان المستخرجة</CardTitle>
                </CardHeader>
                <CardContent>
                  {analyzing ? (
                    <div className="h-[300px] flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      <p className="mr-2">جاري تحليل الألوان...</p>
                    </div>
                  ) : colors.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {colors.map((color, index) => (
                          <div 
                            key={index}
                            className="w-10 h-10 rounded-md border"
                            style={{ backgroundColor: color.hex }}
                            title={`${color.name} - ${color.hex}`}
                          />
                        ))}
                      </div>

                      <div className="space-y-2">
                        {colors.map((color, index) => (
                          <div key={index} className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded-sm mr-2" 
                              style={{ backgroundColor: color.hex }}
                            />
                            <p className="text-sm flex-1">
                              {color.name} <span className="text-muted-foreground ml-1">({color.hex})</span>
                            </p>
                            <p className="text-sm font-medium">{color.percentage}%</p>
                          </div>
                        ))}
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={downloadColorPalette}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        تحميل لوحة الألوان
                      </Button>
                    </div>
                  ) : selectedImage ? (
                    <div className="h-[300px] flex flex-col items-center justify-center text-center">
                      <Palette className="h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">انقر على زر تحليل الألوان لاستخراج الألوان الرئيسية من الصورة</p>
                    </div>
                  ) : (
                    <div className="h-[300px] flex flex-col items-center justify-center text-center">
                      <Palette className="h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">قم بتحميل صورة للبدء في تحليل الألوان</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {colors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">توصيات الألوان</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">ألوان متناسقة</h4>
                    <div className="flex flex-wrap gap-2">
                      <div className="p-3 rounded-md" style={{ backgroundColor: colors[0].hex + "30" }}>
                        <div className="w-10 h-10 rounded-md" style={{ backgroundColor: colors[0].hex }} />
                      </div>
                      <div className="p-3 rounded-md bg-muted">
                        <div className="w-10 h-10 rounded-md" style={{ backgroundColor: colors[1].hex }} />
                      </div>
                      <div className="p-3 rounded-md" style={{ backgroundColor: colors[2].hex + "30" }}>
                        <div className="w-10 h-10 rounded-md" style={{ backgroundColor: colors[2].hex }} />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">نصائح للاستخدام</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>استخدم اللون {colors[0].name} ({colors[0].hex}) كلون رئيسي</li>
                      <li>يمكن استخدام {colors[1].name} ({colors[1].hex}) للعناصر الثانوية</li>
                      <li>استخدم {colors[2].name} ({colors[2].hex}) للتباين وجذب الانتباه</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageColorAnalysis;
