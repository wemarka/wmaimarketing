
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
  PenLine,
  Sparkles,
  Video,
  Palette,
  Users,
  FileImage,
  Settings 
} from "lucide-react";
import { motion } from "framer-motion";

const QuickActions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const actions = [
    {
      icon: <CalendarPlus className="h-5 w-5" />,
      label: t("dashboard.quickActions.schedule"),
      action: () => navigate("/scheduler"),
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: <ImagePlus className="h-5 w-5" />,
      label: t("dashboard.quickActions.uploadImage"),
      action: () => navigate("/image-upload"),
      color: "text-pink-600 dark:text-pink-400"
    },
    {
      icon: <MessageSquarePlus className="h-5 w-5" />,
      label: t("dashboard.quickActions.createPost"),
      action: () => navigate("/content-creator"),
      color: "text-beauty-purple dark:text-beauty-purple"
    },
    {
      icon: <BarChart4 className="h-5 w-5" />,
      label: t("dashboard.quickActions.viewAnalytics"),
      action: () => navigate("/analytics"),
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: t("dashboard.quickActions.createCampaign"),
      action: () => navigate("/ad-generator"),
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: <PenLine className="h-5 w-5" />,
      label: t("dashboard.quickActions.designAd"),
      action: () => navigate("/ad-designer"),
      color: "text-beauty-gold dark:text-beauty-gold"
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      label: t("dashboard.quickActions.aiStudio"),
      action: () => navigate("/ai-studio"),
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: <Video className="h-5 w-5" />,
      label: t("dashboard.quickActions.videoGenerator"),
      action: () => navigate("/video-generator"),
      color: "text-red-600 dark:text-red-400"
    },
    {
      icon: <Palette className="h-5 w-5" />,
      label: t("dashboard.quickActions.contentTools"),
      action: () => navigate("/content-tools"),
      color: "text-teal-600 dark:text-teal-400"
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: t("dashboard.quickActions.settings"),
      action: () => navigate("/profile"),
      color: "text-slate-600 dark:text-slate-400"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{t("dashboard.quickActions.title")}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
          {actions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                className="h-auto w-full flex flex-col items-center gap-2 p-3 hover:bg-slate-50 dark:hover:bg-slate-900"
                onClick={action.action}
              >
                <div className={`${action.color}`}>
                  {action.icon}
                </div>
                <span className="text-xs font-normal text-center">{action.label}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
