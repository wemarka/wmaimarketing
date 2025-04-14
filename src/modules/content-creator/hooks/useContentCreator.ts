
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { generateContent } from "../services/contentService";

export const useContentCreator = () => {
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
      const generatedContent = await generateContent({
        platform,
        language,
        tone,
        product
      });

      setContent(generatedContent);
      
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

  return {
    generating,
    platform,
    setPlatform,
    language,
    setLanguage,
    tone,
    setTone,
    content,
    setContent,
    copied,
    product,
    setProduct,
    handleGenerate,
    handleCopy,
  };
};
