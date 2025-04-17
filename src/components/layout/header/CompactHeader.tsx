
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface CompactHeaderProps {
  showSidebarTrigger?: boolean;
  pageTitle?: string;
}

const CompactHeader: React.FC<CompactHeaderProps> = ({ 
  showSidebarTrigger = false,
  pageTitle = ""
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  return (
    <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
      {showSidebarTrigger && (
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      {pageTitle && (
        <h2 className="font-medium text-lg text-white">
          {pageTitle}
        </h2>
      )}
    </div>
  );
};

export default CompactHeader;
