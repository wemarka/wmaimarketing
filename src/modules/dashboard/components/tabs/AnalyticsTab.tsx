
import React from "react";
import { useTranslation } from "react-i18next";
import { Eye, Heart, MousePointerClick, BarChart } from "lucide-react";
import { StatCard, FeatureCard } from "@/modules/dashboard/components";

const AnalyticsTab = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid xl:grid-cols-4 gap-6">
        <StatCard
          icon={<Eye className="h-5 w-5 text-beauty-purple" />}
          title={t("dashboard.stats.totalViews.title")}
          value="162.5K"
          change="18.3%"
          positive={true}
          trend="month"
        />
        <StatCard
          icon={<Heart className="h-5 w-5 text-beauty-pink" />}
          title={t("dashboard.stats.averageEngagement.title")}
          value="5.2%"
          change="0.7%"
          positive={true}
          trend="month"
        />
        <StatCard
          icon={<MousePointerClick className="h-5 w-5 text-beauty-gold" />}
          title={t("dashboard.stats.averageClicks.title")}
          value="3.1%"
          change="0.4%"
          positive={true}
          trend="month"
        />
        <StatCard
          icon={<BarChart className="h-5 w-5 text-blue-600" />}
          title={t("dashboard.stats.roi.title")}
          value="2.8x"
          change="0.3x"
          positive={true}
          trend="month"
        />
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={<BarChart className="h-5 w-5" />}
          title={t("dashboard.features.analytics.title")}
          description={t("dashboard.features.analytics.description")}
          href="/analytics"
          iconColor="bg-purple-100 text-purple-700"
        />
        <FeatureCard
          icon={<Eye className="h-5 w-5" />}
          title={t("dashboard.features.audienceInsights.title")}
          description={t("dashboard.features.audienceInsights.description")}
          href="/analytics"
          iconColor="bg-beauty-purple/20 text-beauty-purple"
        />
        <FeatureCard
          icon={<Heart className="h-5 w-5" />}
          title={t("dashboard.features.engagementMetrics.title")}
          description={t("dashboard.features.engagementMetrics.description")}
          href="/analytics"
          iconColor="bg-beauty-pink/20 text-beauty-pink"
        />
      </div>
    </div>
  );
};

export default AnalyticsTab;
