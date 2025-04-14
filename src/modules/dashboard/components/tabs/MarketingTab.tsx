
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Megaphone, Palette } from "lucide-react";
import { FeatureCard, MarketingStats, QuickActions } from "@/modules/dashboard/components";

const MarketingTab = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <MarketingStats />
      
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Image className="h-5 w-5" />}
          title={t("dashboard.features.adGenerator.title")}
          description={t("dashboard.features.adGenerator.description")}
          href="/ad-generator"
          iconColor="bg-beauty-pink/20 text-beauty-pink"
        />
        <FeatureCard
          icon={<Megaphone className="h-5 w-5" />}
          title={t("dashboard.features.campaigns.title")}
          description={t("dashboard.features.campaigns.description")}
          href="/ad-designer"
          iconColor="bg-beauty-purple/20 text-beauty-purple"
        />
        <FeatureCard
          icon={<Palette className="h-5 w-5" />}
          title={t("dashboard.features.adDesigner.title")}
          description={t("dashboard.features.adDesigner.description")}
          href="/ad-designer"
          iconColor="bg-beauty-gold/20 text-beauty-gold"
        />
      </div>
      
      <QuickActions />
    </div>
  );
};

export default MarketingTab;
