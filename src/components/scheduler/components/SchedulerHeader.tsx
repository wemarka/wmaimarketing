
import React from "react";
import { Button } from "@/components/ui/button";
import { Settings, CalendarPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SchedulerHeaderProps {
  onNewPostClick: () => void;
}

const SchedulerHeader: React.FC<SchedulerHeaderProps> = ({ onNewPostClick }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{t("scheduler.title", "الجدولة والنشر")}</h1>
        <p className="text-muted-foreground">
          {t("scheduler.description", "إدارة ونشر المحتوى عبر منصات التواصل الاجتماعي")}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          asChild
        >
          <Link to="/scheduler-settings">
            <Settings className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          onClick={onNewPostClick}
          className="flex items-center gap-2"
        >
          <CalendarPlus className="h-4 w-4" />
          {t("scheduler.newPost", "منشور جديد")}
        </Button>
      </div>
    </div>
  );
};

export default SchedulerHeader;
