
import React from "react";
import { useTranslation } from "react-i18next";
import { FileText, Video, Sparkles, Upload, CalendarDays } from "lucide-react";
import { FeatureCard, ContentInsights } from "@/modules/dashboard/components";

const ContentTab = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <ContentInsights />
      
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<FileText className="h-5 w-5" />}
          title={t("dashboard.features.contentCreator.title")}
          description={t("dashboard.features.contentCreator.description")}
          href="/content-creator"
          iconColor="bg-beauty-purple/20 text-beauty-purple"
        />
        <FeatureCard
          icon={<Video className="h-5 w-5" />}
          title={t("dashboard.features.videoGenerator.title")}
          description={t("dashboard.features.videoGenerator.description")}
          href="/video-generator"
          iconColor="bg-blue-100 text-blue-600"
        />
        <FeatureCard
          icon={<Sparkles className="h-5 w-5" />}
          title={t("dashboard.features.aiStudio.title")}
          description={t("dashboard.features.aiStudio.description")}
          href="/ai-studio"
          iconColor="bg-beauty-gold/20 text-beauty-gold"
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FeatureCard
          icon={<Upload className="h-5 w-5" />}
          title={t("dashboard.features.imageUpload.title")}
          description={t("dashboard.features.imageUpload.description")}
          href="/image-upload"
          iconColor="bg-pink-100 text-pink-600"
        />
        <FeatureCard
          icon={<CalendarDays className="h-5 w-5" />}
          title={t("dashboard.features.scheduler.title")}
          description={t("dashboard.features.scheduler.description")}
          href="/scheduler"
          iconColor="bg-green-100 text-green-700"
        />
      </div>
    </div>
  );
};

export default ContentTab;
