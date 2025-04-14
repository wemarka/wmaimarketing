
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, 
  Copy, 
  Check, 
  RefreshCcw, 
  Languages,
  MessageSquarePlus,
  Instagram,
  Facebook,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContentCreator = () => {
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);
  const [platform, setPlatform] = useState("instagram");
  const [language, setLanguage] = useState("both");
  const [tone, setTone] = useState("professional");
  const [content, setContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [product, setProduct] = useState("أحمر شفاه");

  const handleGenerate = async () => {
    setGenerating(true);
    
    try {
      // Call the AI content generator edge function
      const { data, error } = await supabase.functions.invoke('ai-content-generator', {
        body: {
          platform,
          language,
          tone,
          product
        }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setContent(data.content);
      
      toast({
        title: "تم إنشاء المحتوى",
        description: "تم إنشاء المحتوى التسويقي بنجاح",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "خطأ",
        description: `حدث خطأ أثناء إنشاء المحتوى: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!content) return;
    
    navigator.clipboard.writeText(content);
    setCopied(true);
    
    toast({
      title: "تم النسخ!",
      description: "تم نسخ المحتوى إلى الحافظة",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = {
    instagram: {
      icon: <Instagram className="h-4 w-4" />,
      label: "Instagram",
    },
    facebook: {
      icon: <Facebook className="h-4 w-4" />,
      label: "Facebook", 
    },
    tiktok: {
      icon: <MessageSquare className="h-4 w-4" />,
      label: "TikTok", 
    },
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-2">منشئ المحتوى بالذكاء الاصطناعي</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          إنشاء محتوى تسويقي جذاب لمنتجات التجميل الخاصة بك. يقوم الذكاء الاصطناعي بإنشاء
          نصوص، هاشتاغات، ورسائل تسويقية مخصصة لكل منصة.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-6">إعدادات المحتوى</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">المنتج</label>
                  <Select value={product} onValueChange={setProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المنتج" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="أحمر شفاه">أحمر شفاه</SelectItem>
                      <SelectItem value="كريم ترطيب">كريم ترطيب</SelectItem>
                      <SelectItem value="مسكارا">مسكارا</SelectItem>
                      <SelectItem value="سيروم للبشرة">سيروم للبشرة</SelectItem>
                      <SelectItem value="كريم أساس">كريم أساس</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">المنصة</label>
                  <Tabs
                    defaultValue="instagram"
                    value={platform}
                    onValueChange={setPlatform}
                    className="w-full"
                  >
                    <TabsList className="w-full">
                      {Object.entries(platforms).map(([key, { icon, label }]) => (
                        <TabsTrigger key={key} value={key} className="flex-1">
                          <div className="flex items-center gap-1">
                            {icon}
                            <span className="hidden sm:inline">{label}</span>
                          </div>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">اللغة</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر اللغة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">الإنجليزية</SelectItem>
                      <SelectItem value="arabic">العربية</SelectItem>
                      <SelectItem value="both">الإنجليزية والعربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">نبرة المحتوى</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نبرة المحتوى" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">احترافية</SelectItem>
                      <SelectItem value="friendly">ودية وغير رسمية</SelectItem>
                      <SelectItem value="luxury">فاخرة وراقية</SelectItem>
                      <SelectItem value="trendy">عصرية وجريئة</SelectItem>
                      <SelectItem value="educational">تعليمية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                      جاري الإنشاء...
                    </>
                  ) : (
                    <>
                      <MessageSquarePlus className="h-4 w-4 ml-2" />
                      إنشاء المحتوى
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">المحتوى المنشأ</h2>
                {content && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCopy}
                      disabled={copied}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 ml-1" />
                          تم النسخ
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 ml-1" />
                          نسخ
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleGenerate}
                      disabled={generating}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              {generating ? (
                <div className="h-64 flex flex-col items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin mb-4 text-beauty-purple" />
                  <p className="text-muted-foreground">جاري إنشاء محتوى جذاب...</p>
                </div>
              ) : content ? (
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[270px] font-medium"
                />
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                  <Languages className="h-16 w-16 mb-4 text-muted-foreground/50" />
                  <p>قم بتهيئة الإعدادات وإنشاء محتوى تسويقي</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ContentCreator;
