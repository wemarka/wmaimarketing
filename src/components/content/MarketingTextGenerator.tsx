
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MarketingTextGenerator: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [textType, setTextType] = useState("instagram");
  const [tone, setTone] = useState("professional");

  const handleGenerate = () => {
    if (!productInfo.trim()) {
      toast({
        title: "معلومات المنتج مطلوبة",
        description: "يرجى إدخال معلومات المنتج لإنشاء النص",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      // Simulate AI generation
      const demoTexts = {
        instagram: "✨ اكتشفي سر البشرة المثالية مع كريم ترطيب فائق من مجموعتنا الجديدة! 💫 يمنحك بشرة نضرة ومشرقة طوال اليوم. متوفر الآن في متاجرنا وعلى موقعنا الإلكتروني! 🛍️ #مستحضرات_تجميل #عناية_بالبشرة",
        facebook: "أطلقنا للتو كريم الترطيب الفائق الجديد، المصمم خصيصًا للبشرة الجافة والحساسة. يحتوي على مزيج فريد من الفيتامينات والمكونات الطبيعية التي تعزز نضارة البشرة وإشراقها. استمتعي ببشرة رطبة وناعمة مع استخدام منتظم. متوفر الآن في جميع فروعنا وعلى موقعنا الإلكتروني.",
        website: `<h2>كريم الترطيب الفائق - الحل المثالي للبشرة الجافة</h2>
        <p>تقدم لكِ مجموعتنا الجديدة كريم الترطيب الفائق، المصمم خصيصًا لمنح بشرتكِ الترطيب العميق الذي تحتاجه.</p>
        <ul>
          <li>ترطيب يدوم 24 ساعة</li>
          <li>خالٍ من المواد الحافظة الضارة</li>
          <li>مناسب لجميع أنواع البشرة</li>
          <li>معزز بفيتامين E وزبدة الشيا</li>
        </ul>
        <p>اكتشفي الفرق من أول استخدام!</p>`,
        email: "عزيزتي العميلة،\n\nنود أن نعرفك بمنتجنا الجديد: كريم الترطيب الفائق.\n\nصُمم هذا الكريم خصيصًا للبشرة الجافة والحساسة، ويمنحها ترطيبًا عميقًا يدوم طوال اليوم. بفضل تركيبته الغنية بمستخلصات طبيعية وفيتامينات أساسية، سيمنح بشرتك النعومة والإشراق الذي تستحقينه.\n\nاستمتعي بخصم 15% على أول عملية شراء. استخدمي الرمز: HYDRA15\n\nمع أطيب التحيات،\nفريق التجميل"
      };
      
      setGeneratedText(demoTexts[textType as keyof typeof demoTexts]);
      setIsGenerating(false);
      
      toast({
        title: "تم إنشاء النص",
        description: "تم إنشاء النص التسويقي بنجاح",
      });
    }, 2000);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedText);
    toast({
      title: "تم النسخ",
      description: "تم نسخ النص إلى الحافظة",
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold mb-4">إنشاء نصوص تسويقية</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productInfo">معلومات المنتج</Label>
            <Textarea
              id="productInfo"
              placeholder="أدخل اسم ومعلومات المنتج، خصائصه، والفوائد الرئيسية..."
              value={productInfo}
              onChange={(e) => setProductInfo(e.target.value)}
              rows={5}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="textType">نوع النص</Label>
              <Select value={textType} onValueChange={setTextType}>
                <SelectTrigger id="textType">
                  <SelectValue placeholder="اختر نوع النص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">انستجرام</SelectItem>
                  <SelectItem value="facebook">فيسبوك</SelectItem>
                  <SelectItem value="website">موقع الويب</SelectItem>
                  <SelectItem value="email">بريد إلكتروني</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tone">نبرة النص</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue placeholder="اختر نبرة النص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">احترافية</SelectItem>
                  <SelectItem value="friendly">ودية</SelectItem>
                  <SelectItem value="luxury">فاخرة</SelectItem>
                  <SelectItem value="energetic">حماسية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="pt-2">
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>جارِ الإنشاء...</>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  إنشاء النص
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">النص المُنشأ</h2>
          {textType && generatedText && (
            <Badge variant="outline">{textType === "instagram" ? "انستجرام" : 
                                     textType === "facebook" ? "فيسبوك" : 
                                     textType === "website" ? "موقع الويب" : "بريد إلكتروني"}</Badge>
          )}
        </div>
        
        <Card className="min-h-[300px] mb-4">
          <CardContent className="p-4">
            {generatedText ? (
              textType === "website" ? (
                <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: generatedText }} />
              ) : (
                <div className="whitespace-pre-wrap">{generatedText}</div>
              )
            ) : (
              <div className="text-muted-foreground h-full flex items-center justify-center">
                النص المُنشأ سيظهر هنا
              </div>
            )}
          </CardContent>
        </Card>
        
        {generatedText && (
          <Button variant="outline" onClick={handleCopyText} className="w-full">
            <Copy className="mr-2 h-4 w-4" />
            نسخ النص
          </Button>
        )}
      </div>
    </div>
  );
};

export default MarketingTextGenerator;
