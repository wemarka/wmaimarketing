
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Wand2, Sparkles, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateAdContent, generateAdTitles } from "../../services/adContentService";

interface AdContentGeneratorProps {
  onContentGenerated?: (content: string, hashtags?: string[]) => void;
}

const AdContentGenerator: React.FC<AdContentGeneratorProps> = ({ onContentGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTitleGenerating, setIsTitleGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [product, setProduct] = useState("");
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [tone, setTone] = useState("professional");
  const [target, setTarget] = useState("");
  const [style, setStyle] = useState("");

  const handleGenerate = async () => {
    if (!product) {
      toast({
        title: "معلومات المنتج مطلوبة",
        description: "يرجى إدخال معلومات المنتج لإنشاء المحتوى",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateAdContent({
        platform,
        product,
        tone: tone as any,
        target,
        style
      });
      
      setGeneratedContent(result.content);
      setGeneratedHashtags(result.hashtags || []);
      
      if (onContentGenerated) {
        onContentGenerated(result.content, result.hashtags);
      }
      
      toast({
        title: "تم إنشاء المحتوى",
        description: "تم إنشاء المحتوى الإعلاني بنجاح",
      });
    } catch (error) {
      console.error("خطأ في توليد المحتوى:", error);
      toast({
        title: "حدث خطأ",
        description: "تعذر توليد المحتوى الإعلاني",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateTitles = async () => {
    if (!product) {
      toast({
        title: "معلومات المنتج مطلوبة",
        description: "يرجى إدخال معلومات المنتج لإنشاء عناوين مقترحة",
        variant: "destructive",
      });
      return;
    }

    setIsTitleGenerating(true);
    try {
      const titles = await generateAdTitles(product, 5);
      setSuggestedTitles(titles);
      
      toast({
        title: "تم إنشاء العناوين",
        description: "تم إنشاء عناوين مقترحة بنجاح",
      });
    } catch (error) {
      console.error("خطأ في توليد العناوين:", error);
      toast({
        title: "حدث خطأ",
        description: "تعذر توليد العناوين المقترحة",
        variant: "destructive",
      });
    } finally {
      setIsTitleGenerating(false);
    }
  };

  const handleSelectTitle = (selectedTitle: string) => {
    setTitle(selectedTitle);
    toast({
      title: "تم اختيار العنوان",
      description: "تم اختيار العنوان بنجاح",
    });
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "تم النسخ",
      description: "تم نسخ المحتوى إلى الحافظة",
    });
  };

  const handleCopyHashtags = () => {
    navigator.clipboard.writeText(generatedHashtags.map(tag => `#${tag}`).join(" "));
    toast({
      title: "تم النسخ",
      description: "تم نسخ الهاشتاغات إلى الحافظة",
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold mb-4">إنشاء محتوى إعلاني</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product">معلومات المنتج</Label>
            <Input
              id="product"
              placeholder="أدخل اسم المنتج وخصائصه الرئيسية..."
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">العنوان</Label>
            <div className="flex gap-2">
              <Input
                id="title"
                placeholder="عنوان الإعلان..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-grow"
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleGenerateTitles} 
                disabled={isTitleGenerating || !product}
              >
                {isTitleGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              </Button>
            </div>
            
            {suggestedTitles.length > 0 && (
              <div className="mt-3 space-y-2 border rounded-md p-3 bg-muted/20">
                <p className="text-sm font-medium">عناوين مقترحة:</p>
                <div className="space-y-2">
                  {suggestedTitles.map((suggestedTitle, index) => (
                    <div 
                      key={index} 
                      className="text-sm p-2 border rounded cursor-pointer hover:bg-primary/10"
                      onClick={() => handleSelectTitle(suggestedTitle)}
                    >
                      {suggestedTitle}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="platform">المنصة</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger id="platform">
                  <SelectValue placeholder="اختر المنصة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">انستجرام</SelectItem>
                  <SelectItem value="facebook">فيسبوك</SelectItem>
                  <SelectItem value="tiktok">تيك توك</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tone">نبرة المحتوى</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue placeholder="اختر النبرة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">احترافية</SelectItem>
                  <SelectItem value="friendly">ودية</SelectItem>
                  <SelectItem value="luxury">فاخرة</SelectItem>
                  <SelectItem value="trendy">عصرية</SelectItem>
                  <SelectItem value="educational">تعليمية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="target">الجمهور المستهدف</Label>
            <Input
              id="target"
              placeholder="الجمهور المستهدف (اختياري)..."
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="style">أسلوب الإعلان</Label>
            <Input
              id="style"
              placeholder="أسلوب الإعلان (اختياري)..."
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            />
          </div>
          
          <div className="pt-2">
            <Button onClick={handleGenerate} disabled={isGenerating || !product}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جارِ الإنشاء...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  إنشاء المحتوى
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">المحتوى المُنشأ</h2>
          {platform && generatedContent && (
            <Badge variant="outline">
              {platform === "instagram" ? "انستجرام" : 
               platform === "facebook" ? "فيسبوك" : "تيك توك"}
            </Badge>
          )}
        </div>
        
        <Card className="mb-4">
          <CardContent className="p-4 min-h-[200px]">
            {generatedContent ? (
              <div className="whitespace-pre-wrap">{generatedContent}</div>
            ) : (
              <div className="text-muted-foreground h-full flex items-center justify-center">
                المحتوى المُنشأ سيظهر هنا
              </div>
            )}
          </CardContent>
          {generatedContent && (
            <CardFooter className="border-t p-4 bg-muted/10">
              <Button variant="outline" size="sm" onClick={handleCopyContent} className="w-full">
                <Copy className="mr-2 h-4 w-4" />
                نسخ المحتوى
              </Button>
            </CardFooter>
          )}
        </Card>
        
        {generatedHashtags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">الهاشتاغات المقترحة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {generatedHashtags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary">#{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 bg-muted/10">
              <Button variant="outline" size="sm" onClick={handleCopyHashtags} className="w-full">
                <Copy className="mr-2 h-4 w-4" />
                نسخ الهاشتاغات
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdContentGenerator;
