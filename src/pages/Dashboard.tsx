
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import FeatureCard from "@/components/dashboard/FeatureCard";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingPosts from "@/components/dashboard/UpcomingPosts";
import { Button } from "@/components/ui/button";
import DashboardGreeting from "@/components/dashboard/DashboardGreeting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostStatusTracker from "@/components/analytics/PostStatusTracker";
import {
  Upload,
  Image,
  FileText,
  Video,
  CalendarDays,
  BarChart,
  Eye,
  Heart,
  MousePointerClick,
  Megaphone,
  Palette,
  Sparkles,
} from "lucide-react";
import PerformanceSummary from "@/components/dashboard/PerformanceSummary";
import MarketingStats from "@/components/dashboard/MarketingStats";
import ContentInsights from "@/components/dashboard/ContentInsights";
import QuickActions from "@/components/dashboard/QuickActions";
import DashboardAnnouncement from "@/components/dashboard/DashboardAnnouncement";

const Dashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <DashboardGreeting />
        
        <Tabs 
          defaultValue="overview" 
          className="mb-8"
          onValueChange={(value) => setActiveTab(value)}
        >
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="overview" className="px-5">
                {t("dashboard.tabs.overview")}
              </TabsTrigger>
              <TabsTrigger value="marketing" className="px-5">
                {t("dashboard.tabs.marketing")}
              </TabsTrigger>
              <TabsTrigger value="content" className="px-5">
                {t("dashboard.tabs.content")}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="px-5">
                {t("dashboard.tabs.analytics")}
              </TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm">
              {t("dashboard.actions.customize")}
            </Button>
          </div>
          
          {/* Tab: Overview */}
          <TabsContent value="overview" className="space-y-6 animate-fade-in">
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
          </TabsContent>
          
          {/* Tab: Marketing */}
          <TabsContent value="marketing" className="space-y-6 animate-fade-in">
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
          </TabsContent>
          
          {/* Tab: Content */}
          <TabsContent value="content" className="space-y-6 animate-fade-in">
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
          </TabsContent>
          
          {/* Tab: Analytics */}
          <TabsContent value="analytics" className="space-y-6 animate-fade-in">
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
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
