
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  CalendarPlus, 
  ImagePlus, 
  MessageSquarePlus, 
  BarChart4, 
  FileText, 
  PenLine 
} from "lucide-react";

const QuickActions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const actions = [
    {
      icon: <CalendarPlus className="h-5 w-5" />,
      label: t("dashboard.quickActions.schedule"),
      action: () => navigate("/scheduler"),
      color: "text-green-600"
    },
    {
      icon: <ImagePlus className="h-5 w-5" />,
      label: t("dashboard.quickActions.uploadImage"),
      action: () => navigate("/image-upload"),
      color: "text-pink-600"
    },
    {
      icon: <MessageSquarePlus className="h-5 w-5" />,
      label: t("dashboard.quickActions.createPost"),
      action: () => navigate("/content-creator"),
      color: "text-beauty-purple"
    },
    {
      icon: <BarChart4 className="h-5 w-5" />,
      label: t("dashboard.quickActions.viewAnalytics"),
      action: () => navigate("/analytics"),
      color: "text-blue-600"
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: t("dashboard.quickActions.createCampaign"),
      action: () => navigate("/ad-generator"),
      color: "text-orange-600"
    },
    {
      icon: <PenLine className="h-5 w-5" />,
      label: t("dashboard.quickActions.designAd"),
      action: () => navigate("/ad-designer"),
      color: "text-beauty-gold"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{t("dashboard.quickActions.title")}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto flex flex-col items-center gap-2 p-4 hover:bg-slate-50 dark:hover:bg-slate-900"
              onClick={action.action}
            >
              <div className={`${action.color}`}>
                {action.icon}
              </div>
              <span className="text-xs font-normal text-center">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
