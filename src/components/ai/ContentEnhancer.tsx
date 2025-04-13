
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "lucide-react";
import ErrorAlert from "./image-generator/ErrorAlert";
import EnhancerForm from "./content-enhancer/EnhancerForm";
import EnhancedContentDisplay from "./content-enhancer/EnhancedContentDisplay";

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
        <ErrorAlert errorMessage={errorMessage} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EnhancerForm 
            content={content}
            setContent={setContent}
            action={action}
            setAction={setAction}
            language={language}
            setLanguage={setLanguage}
            isLoading={isLoading}
            handleEnhance={enhanceContent}
          />
          
          <EnhancedContentDisplay 
            enhancedContent={enhancedContent}
            errorMessage={errorMessage}
            onSave={onSave ? handleSave : undefined}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentEnhancer;
