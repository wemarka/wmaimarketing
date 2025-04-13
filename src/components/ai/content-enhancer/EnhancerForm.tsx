
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";

interface EnhancerFormProps {
  content: string;
  setContent: (value: string) => void;
  action: "improve" | "summarize" | "hashtags" | "translate";
  setAction: (value: "improve" | "summarize" | "hashtags" | "translate") => void;
  language: string;
  setLanguage: (value: string) => void;
  isLoading: boolean;
  handleEnhance: () => void;
}

const EnhancerForm: React.FC<EnhancerFormProps> = ({
  content,
  setContent,
  action,
  setAction,
  language,
  setLanguage,
  isLoading,
  handleEnhance
}) => {
  return (
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
        onClick={handleEnhance} 
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
  );
};

export default EnhancerForm;
