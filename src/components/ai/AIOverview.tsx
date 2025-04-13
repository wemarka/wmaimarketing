
import React from "react";
import { Bot, Image, MessageSquare, Video, Zap } from "lucide-react";
import AICapabilityCard from "./AICapabilityCard";
import { useTranslation } from "react-i18next";

const AIOverview: React.FC = () => {
  const { t } = useTranslation();
  
  const capabilities = [
    {
      title: t("aiStudio.capabilities.contentEnhancement.title"),
      description: t("aiStudio.capabilities.contentEnhancement.description"),
      icon: MessageSquare,
      color: "text-blue-500",
      badgeText: t("aiStudio.common.popular")
    },
    {
      title: t("aiStudio.capabilities.imageGeneration.title"),
      description: t("aiStudio.capabilities.imageGeneration.description"),
      icon: Image,
      color: "text-purple-500"
    },
    {
      title: t("aiStudio.capabilities.videoIdeas.title"),
      description: t("aiStudio.capabilities.videoIdeas.description"),
      icon: Video,
      color: "text-red-500"
    },
    {
      title: t("aiStudio.capabilities.performanceAnalysis.title"),
      description: t("aiStudio.capabilities.performanceAnalysis.description"),
      icon: Zap,
      color: "text-amber-500",
      badgeText: t("aiStudio.common.comingSoon")
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 text-center">
        <div className="mx-auto bg-muted/50 p-3 rounded-full">
          <Bot className="h-8 w-8 text-beauty-gold" />
        </div>
        <h2 className="text-2xl font-bold">{t("aiStudio.overview.welcome")}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("aiStudio.overview.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {capabilities.map((item) => (
          <AICapabilityCard
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
            color={item.color}
            badgeText={item.badgeText}
          />
        ))}
      </div>
    </div>
  );
};

export default AIOverview;
