
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Check, Copy, Loader2, Languages, Sparkles, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ContentEnhancerProps {
  initialContent?: string;
  onSave?: (enhancedContent: string) => void;
}

const ContentEnhancer: React.FC<ContentEnhancerProps> = ({ initialContent = "", onSave }) => {
  const [content, setContent] = useState(initialContent);
  const [enhancedContent, setEnhancedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState<"improve" | "summarize" | "hashtags" | "translate">("improve");
  const [language, setLanguage] = useState("Arabic");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const enhanceContent = async () => {
    if (!content.trim()) {
      toast({
        title: "المحتوى مطلوب",
        description: "يرجى إدخال نص لتحسينه",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-content-enhancer', {
        body: { content, action, language }
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
        setEnhancedContent(data.enhancedContent);
        toast({
          title: "تم تحسين المحتوى",
          description: "تم تحسين المحتوى بنجاح باستخدام الذكاء الاصطناعي",
        });
      }
    } catch (error) {
      console.error("Error enhancing content:", error);
      setErrorMessage(error instanceof Error ? error.message : 'حدث خطأ غير متوقع');
      toast({
        title: "خطأ",
        description: `حدث خطأ أثناء تحسين المحتوى: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(enhancedContent);
    toast({
      title: "تم النسخ",
      description: "تم نسخ المحتوى المحسن إلى الحافظة",
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(enhancedContent);
      toast({
        title: "تم الحفظ",
        description: "تم حفظ المحتوى المحسن بنجاح",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-beauty-gold" />
          تحسين المحتوى بالذكاء الاصطناعي
        </CardTitle>
        <CardDescription>استخدم الذكاء الاصطناعي لتحسين محتوى التسويق الخاص بك</CardDescription>
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
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">المحتوى الأصلي</h3>
              <div className="flex items-center gap-2">
                <Select value={action} onValueChange={(value) => setAction(value as any)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="اختر الإجراء" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="improve">تحسين المحتوى</SelectItem>
                    <SelectItem value="summarize">تلخيص المحتوى</SelectItem>
                    <SelectItem value="hashtags">إنشاء هاشتاغات</SelectItem>
                    <SelectItem value="translate">ترجمة المحتوى</SelectItem>
                  </SelectContent>
                </Select>
                
                {action === "translate" && (
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="اختر اللغة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arabic">العربية</SelectItem>
                      <SelectItem value="English">الإنجليزية</SelectItem>
                      <SelectItem value="French">الفرنسية</SelectItem>
                      <SelectItem value="Spanish">الإسبانية</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
            
            <Textarea 
              placeholder="أدخل محتوى التسويق الخاص بك هنا..." 
              className="h-[200px] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            <Button 
              onClick={enhanceContent} 
              className="w-full"
              disabled={isLoading || !content.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جارٍ التحسين...
                </>
              ) : (
                <>
                  <Wand2 className="ml-2 h-4 w-4" />
                  تحسين المحتوى
                </>
              )}
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">المحتوى المحسن</h3>
              {enhancedContent && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="ml-1 h-3 w-3" />
                    نسخ
                  </Button>
                  {onSave && (
                    <Button size="sm" onClick={handleSave}>
                      <Check className="ml-1 h-3 w-3" />
                      استخدام
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            <div className={`border rounded-md p-3 bg-muted/20 h-[200px] overflow-y-auto ${!enhancedContent && !errorMessage && 'flex items-center justify-center'}`}>
              {errorMessage ? (
                <div className="text-sm text-destructive">{errorMessage}</div>
              ) : enhancedContent ? (
                <div className="text-sm whitespace-pre-wrap">{enhancedContent}</div>
              ) : (
                <p className="text-muted-foreground text-center">المحتوى المحسن سيظهر هنا</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentEnhancer;
