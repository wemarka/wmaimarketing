
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, BarChart } from "lucide-react";
import ErrorAlert from "../image-generator/ErrorAlert";
import AnalyzerForm from "./AnalyzerForm";
import AnalysisResult from "./AnalysisResult";

const ContentAnalyzer: React.FC = () => {
  const [content, setContent] = useState("");
  const [analysisType, setAnalysisType] = useState<"sentiment" | "marketing" | "seo" | "audience">("marketing");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzeContent = async () => {
    if (!content.trim()) {
      toast({
        title: "المحتوى مطلوب",
        description: "يرجى إدخال نص لتحليله",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-content-analyzer', {
        body: { content, analysisType }
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
        setAnalysisResult(data.analysisResult);
        toast({
          title: "تم التحليل",
          description: "تم تحليل المحتوى بنجاح باستخدام الذكاء الاصطناعي",
        });
      }
    } catch (error) {
      console.error("Error analyzing content:", error);
      setErrorMessage(error instanceof Error ? error.message : 'حدث خطأ غير متوقع');
      toast({
        title: "خطأ",
        description: `حدث خطأ أثناء تحليل المحتوى: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-beauty-purple" />
          تحليل المحتوى التسويقي
        </CardTitle>
        <CardDescription>تحليل المحتوى التسويقي ومدى فعاليته وتأثيره على الجمهور المستهدف</CardDescription>
      </CardHeader>
      <CardContent>
        <ErrorAlert errorMessage={errorMessage} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnalyzerForm 
            content={content}
            setContent={setContent}
            analysisType={analysisType}
            setAnalysisType={setAnalysisType}
            isLoading={isLoading}
            handleAnalyze={analyzeContent}
          />
          
          <AnalysisResult 
            analysisResult={analysisResult}
            errorMessage={errorMessage}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentAnalyzer;
