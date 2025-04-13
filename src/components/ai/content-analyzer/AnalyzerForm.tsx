
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search } from "lucide-react";

interface AnalyzerFormProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  analysisType: "sentiment" | "marketing" | "seo" | "audience";
  setAnalysisType: React.Dispatch<React.SetStateAction<"sentiment" | "marketing" | "seo" | "audience">>;
  isLoading: boolean;
  handleAnalyze: () => void;
}

const AnalyzerForm: React.FC<AnalyzerFormProps> = ({
  content,
  setContent,
  analysisType,
  setAnalysisType,
  isLoading,
  handleAnalyze
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="content">المحتوى للتحليل</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="أدخل النص التسويقي الذي تريد تحليله..."
          className="h-36 resize-none"
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="analysisType">نوع التحليل</Label>
        <Select
          value={analysisType}
          onValueChange={(value: "sentiment" | "marketing" | "seo" | "audience") => setAnalysisType(value)}
          disabled={isLoading}
        >
          <SelectTrigger id="analysisType">
            <SelectValue placeholder="اختر نوع التحليل" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sentiment">تحليل المشاعر</SelectItem>
            <SelectItem value="marketing">تحليل الفعالية التسويقية</SelectItem>
            <SelectItem value="seo">تحليل تحسين محركات البحث</SelectItem>
            <SelectItem value="audience">تحليل الجمهور المستهدف</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={handleAnalyze} 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            جارٍ التحليل...
          </>
        ) : (
          <>
            <Search className="ml-2 h-4 w-4" />
            تحليل المحتوى
          </>
        )}
      </Button>
    </div>
  );
};

export default AnalyzerForm;
