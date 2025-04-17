
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, RefreshCw } from 'lucide-react';
import { platformData, engagementData, upcomingPostsData, tabItems } from './mockData';
import PlatformCard from './PlatformCard';
import EngagementChart from './EngagementChart';
import UpcomingPosts from './UpcomingPosts';
import IntegrationAnalytics from './IntegrationAnalytics';

const SocialIntegrationDashboard = () => {
  const [activeTab, setActiveTab] = React.useState('overview');
  
  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-beauty-purple">إدارة منصات التواصل الاجتماعي</h1>
          <p className="text-muted-foreground mt-2">
            إدارة وتحليل جميع منصات التواصل الاجتماعي من مكان واحد
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            الإعدادات
          </Button>
          <Button size="sm" className="flex items-center gap-1 bg-beauty-purple hover:bg-beauty-purple/90">
            <RefreshCw className="h-4 w-4" />
            تحديث البيانات
          </Button>
        </div>
      </div>
      
      {/* Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50">
          {tabItems.map(tab => (
            <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformData.map((platform) => (
              <PlatformCard 
                key={platform.name}
                name={platform.name}
                posts={platform.posts}
                engagement={platform.engagement}
                followers={platform.followers}
                trend={platform.trend}
              />
            ))}
          </div>
          
          {/* Charts and Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EngagementChart data={engagementData} />
            <UpcomingPosts posts={upcomingPostsData} />
          </div>
          
          {/* Analytics */}
          <IntegrationAnalytics />
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="text-center py-20 text-muted-foreground">
            قريبًا - سيتم إضافة تحليلات مفصلة لكل منصة
          </div>
        </TabsContent>
        
        <TabsContent value="scheduler">
          <div className="text-center py-20 text-muted-foreground">
            قريبًا - سيتم إضافة أداة جدولة المنشورات لجميع المنصات
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="text-center py-20 text-muted-foreground">
            قريبًا - سيتم إضافة إعدادات متقدمة لكل منصة
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialIntegrationDashboard;
