
import React from "react";
import { Shield, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface HeaderPrioritiesProps {
  priorities: string[];
}

const HeaderPriorities: React.FC<HeaderPrioritiesProps> = ({ priorities }) => {
  const { t } = useTranslation();
  
  return (
    <div className="hidden md:flex bg-white/80 dark:bg-slate-800/70 py-2 px-4 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-700/40 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 mr-2">
          <Shield className="h-4 w-4 text-beauty-purple" />
          <p className="text-sm font-medium">{t("dashboard.todayPriorities", "أولويات اليوم")}</p>
          <Badge variant="outline" className="text-xs bg-beauty-purple/10 text-beauty-purple border-beauty-purple/20">{priorities.length}</Badge>
        </div>
      </div>
      <ul className="ml-4 text-sm hidden lg:block">
        {priorities.slice(0, 1).map((priority, index) => (
          <span key={index} className="flex items-center gap-1.5 text-muted-foreground">
            <Star className="h-3 w-3 text-beauty-gold fill-beauty-gold" /> {priority}
          </span>
        ))}
      </ul>
    </div>
  );
};

export default HeaderPriorities;
