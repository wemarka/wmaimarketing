
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CompetitorDashboard from '@/modules/marketing/components/competitor/CompetitorDashboard';
import CompetitorComparison from '@/modules/marketing/components/competitor/CompetitorComparison';
import ContentAnalysis from '@/modules/marketing/components/competitor/ContentAnalysis';
import SocialListening from '@/modules/marketing/components/competitor/SocialListening';
import MarketShare from '@/modules/marketing/components/competitor/MarketShare';
import { Plus, Download, FileText } from 'lucide-react';

const CompetitorAnalysis = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <Layout>
      <Helmet>
        <title>{t('competitor.title', 'تحليل المنافسين')} - سيركل</title>
      </Helmet>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
              {t('competitor.title', 'تحليل المنافسين')}
            </h1>
            <p className="text-muted-foreground">
              {t('competitor.description', 'مراقبة وتحليل أداء العلامات التجارية المنافسة')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {t('competitor.report', 'تقرير')}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              {t('competitor.export', 'تصدير')}
            </Button>
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              {t('competitor.add', 'إضافة منافس')}
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">{t('competitor.tabs.dashboard', 'النظرة العامة')}</TabsTrigger>
            <TabsTrigger value="comparison">{t('competitor.tabs.comparison', 'المقارنة')}</TabsTrigger>
            <TabsTrigger value="content">{t('competitor.tabs.content', 'تحليل المحتوى')}</TabsTrigger>
            <TabsTrigger value="social">{t('competitor.tabs.social', 'الاستماع الاجتماعي')}</TabsTrigger>
            <TabsTrigger value="market">{t('competitor.tabs.market', 'حصة السوق')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <CompetitorDashboard />
          </TabsContent>
          
          <TabsContent value="comparison">
            <CompetitorComparison />
          </TabsContent>
          
          <TabsContent value="content">
            <ContentAnalysis />
          </TabsContent>
          
          <TabsContent value="social">
            <SocialListening />
          </TabsContent>
          
          <TabsContent value="market">
            <MarketShare />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CompetitorAnalysis;
