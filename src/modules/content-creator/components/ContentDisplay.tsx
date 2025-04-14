
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, RefreshCcw, Languages, Loader2 } from "lucide-react";

interface ContentDisplayProps {
  content: string | null;
  setContent: (content: string) => void;
  generating: boolean;
  copied: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  content,
  setContent,
  generating,
  copied,
  onCopy,
  onRegenerate,
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">المحتوى المنشأ</h2>
        {content && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onCopy}
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
              onClick={onRegenerate}
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
    </>
  );
};

export default ContentDisplay;
