
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AnalysisResultProps {
  analysisResult: string | null;
  errorMessage: string | null;
  isLoading: boolean;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({
  analysisResult,
  errorMessage,
  isLoading
}) => {
  const { toast } = useToast();

  const handleCopy = () => {
    if (analysisResult) {
      navigator.clipboard.writeText(analysisResult);
      toast({
        title: "تم النسخ",
        description: "تم نسخ نتيجة التحليل إلى الحافظة",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">نتيجة التحليل</h3>
        {analysisResult && (
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="ml-1 h-3 w-3" />
            نسخ
          </Button>
        )}
      </div>
      
      <div className={`border rounded-md p-3 bg-muted/20 h-[350px] overflow-y-auto ${!analysisResult && !errorMessage && !isLoading && 'flex items-center justify-center'}`}>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">جارٍ تحليل المحتوى...</p>
          </div>
        ) : errorMessage ? (
          <div className="text-sm text-destructive">{errorMessage}</div>
        ) : analysisResult ? (
          <div className="text-sm whitespace-pre-wrap">{analysisResult}</div>
        ) : (
          <p className="text-muted-foreground text-center">نتيجة التحليل ستظهر هنا</p>
        )}
      </div>
    </div>
  );
};

export default AnalysisResult;
