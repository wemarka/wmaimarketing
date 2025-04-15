
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Wand2, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateAdContent, generateAdTitles } from "../../services/adContentService";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const [error, setError] = useState<string | null>(null);

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
    setError(null);
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
      setError(error instanceof Error ? error.message : "تعذر توليد المحتوى الإعلاني");
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
    setError(null);
    try {
      const titles = await generateAdTitles(product, 5);
      setSuggestedTitles(titles);
      
      toast({
        title: "تم إنشاء العناوين",
        description: "تم إنشاء عناوين مقترحة بنجاح",
      });
    } catch (error) {
      console.error("خطأ في توليد العناوين:", error);
      setError(error instanceof Error ? error.message : "تعذر توليد العناوين المقترحة");
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

  const handleDismissError = () => {
    setError(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid md:grid-cols-2 gap-8"
    >
      <div>
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-xl font-bold mb-4"
        >
          إنشاء محتوى إعلاني
        </motion.h2>
        
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>خطأ في توليد المحتوى</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="space-y-4"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            className="space-y-2"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <Label htmlFor="product">معلومات المنتج</Label>
            <Input
              id="product"
              placeholder="أدخل اسم المنتج وخصائصه الرئيسية..."
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-2"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <Label htmlFor="title">العنوان</Label>
            <div className="flex gap-2">
              <Input
                id="title"
                placeholder="عنوان الإعلان..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-grow transition-all focus:ring-2 focus:ring-primary/20"
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleGenerateTitles} 
                disabled={isTitleGenerating || !product}
                className="relative overflow-hidden"
              >
                {isTitleGenerating ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                )}
              </Button>
            </div>
            
            <AnimatePresence>
              {suggestedTitles.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 space-y-2 border rounded-md p-3 bg-muted/20"
                >
                  <p className="text-sm font-medium">عناوين مقترحة:</p>
                  <div className="space-y-2">
                    {suggestedTitles.map((suggestedTitle, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0, 
                          transition: { delay: index * 0.1 } 
                        }}
                        className="text-sm p-2 border rounded cursor-pointer hover:bg-primary/10 transition-colors"
                        onClick={() => handleSelectTitle(suggestedTitle)}
                        whileHover={{ scale: 1.01, backgroundColor: "rgba(var(--primary), 0.1)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {suggestedTitle}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 }
            }}
          >
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
          </motion.div>
          
          <motion.div 
            className="space-y-2"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <Label htmlFor="target">الجمهور المستهدف</Label>
            <Input
              id="target"
              placeholder="الجمهور المستهدف (اختياري)..."
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-2"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <Label htmlFor="style">أسلوب الإعلان</Label>
            <Input
              id="style"
              placeholder="أسلوب الإعلان (اختياري)..."
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </motion.div>
          
          <motion.div 
            className="pt-2"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !product}
              className="relative overflow-hidden transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
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
              
              {isGenerating && (
                <motion.span 
                  className="absolute inset-0 bg-primary/10"
                  animate={{
                    width: ["0%", "100%"],
                    left: ["0%", "0%", "100%"]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "linear" 
                  }}
                />
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <motion.h2 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-xl font-bold"
          >
            المحتوى المُنشأ
          </motion.h2>
          {platform && generatedContent && (
            <Badge variant="outline">
              {platform === "instagram" ? "انستجرام" : 
               platform === "facebook" ? "فيسبوك" : "تيك توك"}
            </Badge>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-4 overflow-hidden">
            <CardContent className="p-4 min-h-[200px] relative">
              {isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="mt-2 text-sm text-muted-foreground">جارِ إنشاء المحتوى...</p>
                </div>
              ) : generatedContent ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-pre-wrap"
                >
                  {generatedContent}
                </motion.div>
              ) : (
                <div className="text-muted-foreground h-full flex items-center justify-center">
                  المحتوى المُنشأ سيظهر هنا
                </div>
              )}
            </CardContent>
            {generatedContent && (
              <CardFooter className="border-t p-4 bg-muted/10">
                <Button variant="outline" size="sm" onClick={handleCopyContent} className="w-full group">
                  <Copy className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  نسخ المحتوى
                </Button>
              </CardFooter>
            )}
          </Card>
        </motion.div>
        
        <AnimatePresence>
          {generatedHashtags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">الهاشتاغات المقترحة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {generatedHashtags.map((tag, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                      >
                        <Badge variant="secondary">#{tag}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 bg-muted/10">
                  <Button variant="outline" size="sm" onClick={handleCopyHashtags} className="w-full group">
                    <Copy className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    نسخ الهاشتاغات
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AdContentGenerator;
