
import React from "react";
import { useTranslation } from "react-i18next";
import { Eye, Heart, MousePointerClick } from "lucide-react";
import { StatCard } from "@/modules/dashboard/components";
import NotificationsWidget from "@/components/dashboard/NotificationsWidget";
import EngagementInsights from "@/components/dashboard/EngagementInsights";
import PerformanceSummary from "@/components/dashboard/PerformanceSummary";
import PostStatusTracker from "@/components/analytics/PostStatusTracker";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingPosts from "@/components/dashboard/UpcomingPosts";
import DashboardAnnouncement from "@/modules/dashboard/components/DashboardAnnouncement";

const OverviewTab = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid xl:grid-cols-3 gap-6">
        <StatCard
          icon={<Eye className="h-5 w-5 text-beauty-purple" />}
          title={t("dashboard.stats.impressions.title")}
          value="15.2K"
          change="12%"
          positive={true}
          trend="week"
        />
        <StatCard
          icon={<Heart className="h-5 w-5 text-beauty-pink" />}
          title={t("dashboard.stats.engagement.title")}
          value="4.8%"
          change="0.5%"
          positive={true}
          trend="week"
        />
        <StatCard
          icon={<MousePointerClick className="h-5 w-5 text-beauty-gold" />}
          title={t("dashboard.stats.conversion.title")}
          value="2.1%"
          change="0.2%"
          positive={false}
          trend="week"
        />
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <EngagementInsights />
        </div>
        <NotificationsWidget />
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PerformanceSummary />
        </div>
        <div>
          <PostStatusTracker />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <RecentActivity />
        <UpcomingPosts />
      </div>
      
      <DashboardAnnouncement />
    </div>
  );
};

export default OverviewTab;
