import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tabItems } from './data/navData';
import PlatformCard from './PlatformCard';
import IntegrationAnalytics from './IntegrationAnalytics';
import EngagementChart from './EngagementChart';
import UpcomingPosts from './UpcomingPosts';
import { platformData, engagementData, upcomingPostsData } from './data';

const SocialIntegrationDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">تكامل وسائل التواصل الاجتماعي</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          {tabItems.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              {tab.icon}
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformData.map((platform) => (
              <PlatformCard
                key={platform.id}
                name={platform.name}
                status={platform.status}
                platform={platform.id}
                accountName={platform.accountName}
                posts={platform.posts}
                engagement={platform.engagement}
                followers={platform.followers}
                trend={platform.trend}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <IntegrationAnalytics />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <UpcomingPosts posts={upcomingPostsData} />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <EngagementChart data={engagementData} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="posts">
          <h2 className="text-xl font-semibold mb-4">إدارة المنشورات</h2>
          {/* محتوى منشورات سيضاف لاحقا */}
        </TabsContent>
        
        <TabsContent value="webhooks">
          <h2 className="text-xl font-semibold mb-4">إعدادات Webhook</h2>
          {/* محتوى webhook سيضاف لاحقا */}
        </TabsContent>
        
        <TabsContent value="analytics">
          <h2 className="text-xl font-semibold mb-4">تحليلات التسويق</h2>
          <div className="grid gap-6">
            <Card>
              <CardContent className="pt-6">
                <EngagementChart data={engagementData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialIntegrationDashboard;
