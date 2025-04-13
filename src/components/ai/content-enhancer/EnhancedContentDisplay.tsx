
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface EnhancedContentDisplayProps {
  enhancedContent: string;
  errorMessage: string | null;
  onSave?: () => void;
}

const EnhancedContentDisplay: React.FC<EnhancedContentDisplayProps> = ({
  enhancedContent,
  errorMessage,
  onSave
}) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(enhancedContent);
    toast({
      title: "تم النسخ",
      description: "تم نسخ المحتوى المحسن إلى الحافظة",
    });
  };

  return (
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
              <Button size="sm" onClick={onSave}>
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
  );
};

export default EnhancedContentDisplay;
