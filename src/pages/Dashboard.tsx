
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Helmet } from "react-helmet-async";
import OverviewTab from "@/modules/dashboard/components/tabs/OverviewTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { LineChart, Activity, PieChart, BarChart, LayoutDashboard, Zap } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import AnimateInView from "@/components/ui/animate-in-view";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Animation variants for each section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };
  
  const getGreetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('greetings.morning', 'صباح الخير');
    if (hour < 18) return t('greetings.afternoon', 'مساء الخير');
    return t('greetings.evening', 'مساء الخير');
  };
  
  const displayName = profile?.first_name 
    ? `${profile?.first_name}`
    : user?.email?.split('@')[0] || t('user', 'المستخدم');

  // Live insights data - would come from API in production
  const liveInsights = [
    { label: t('dashboard.insights.views', 'مشاهدات اليوم'), value: '2,547', change: '+12%', trend: 'up' },
    { label: t('dashboard.insights.engagement', 'نسبة التفاعل'), value: '4.5%', change: '+3.2%', trend: 'up' },
    { label: t('dashboard.insights.clicks', 'نقرات'), value: '687', change: '-2.1%', trend: 'down' },
  ];

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" className="hidden sm:flex">
        {t('dashboard.actions.export', 'تصدير')}
      </Button>
      <Button variant="default" size="sm" className="flex items-center gap-1.5">
        <Zap className="h-3.5 w-3.5" />
        {t('dashboard.actions.refresh', 'تحديث')}
      </Button>
    </div>
  );
    
  return (
    <Layout>
      <Helmet>
        <title>{t('dashboard.title', 'لوحة التحكم')} - سيركل</title>
      </Helmet>
      
      <PageHeader
        title={`${getGreetingTime()}, ${displayName}`}
        description={t('dashboard.welcome', 'مرحبًا بعودتك! هذه هي النظرة العامة على حساباتك.')}
        variant="gradient"
        icon={<LayoutDashboard className="w-5 h-5" />}
        actions={actions}
      />
      
      {/* Live Insights - New Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        {liveInsights.map((insight, index) => (
          <Card key={index} className="overflow-hidden border-none shadow-sm bg-white/70 backdrop-blur-sm hover:shadow-md transition-all">
            <div className="p-4 flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{insight.label}</p>
                <p className="text-2xl font-bold">{insight.value}</p>
                <div className={`text-xs flex items-center gap-1 ${
                  insight.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {insight.trend === 'up' ? '↑' : '↓'}
                  {insight.change}
                  <span className="text-muted-foreground">من الأمس</span>
                </div>
              </div>
              <div className="h-14 w-20 bg-muted/30 rounded flex items-end overflow-hidden">
                {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                  <div 
                    key={bar}
                    className={`w-2 mx-0.5 rounded-t ${insight.trend === 'up' ? 'bg-emerald-500/70' : 'bg-red-500/70'}`} 
                    style={{ 
                      height: `${Math.random() * 50 + 30}%`,
                      animationDelay: `${bar * 0.1}s`,
                      animation: 'pulse 2s infinite'
                    }}
                  />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      <motion.div 
        className="w-full transition-all space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >        
        {/* Tab Navigation */}
        <AnimateInView animation="slide-up">
          <Tabs 
            defaultValue="overview" 
            value={activeTab}
            onValueChange={setActiveTab} 
            className="space-y-4"
          >
            <div className="flex justify-between items-center mb-2">
              <TabsList className="grid grid-cols-4 md:w-[400px]">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Activity size={16} />
                  <span>{t('dashboard.tabs.overview', 'النظرة العامة')}</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <LineChart size={16} />
                  <span>{t('dashboard.tabs.analytics', 'التحليل')}</span>
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <PieChart size={16} />
                  <span>{t('dashboard.tabs.content', 'المحتوى')}</span>
                </TabsTrigger>
                <TabsTrigger value="marketing" className="flex items-center gap-2">
                  <BarChart size={16} />
                  <span>{t('dashboard.tabs.marketing', 'التسويق')}</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="hidden md:flex">
                <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t('dashboard.actions.ai_suggestions', 'اقتراحات ذكية')}
                </Button>
              </div>
            </div>
            
            <TabsContent value="overview" className="space-y-6">
              <AnimateInView animation="fade" delay={0.1}>
                <OverviewTab />
              </AnimateInView>
            </TabsContent>
            
            <TabsContent value="analytics">
              <AnimateInView animation="fade">
                <Card className="bg-white/70 backdrop-blur-sm border-none shadow-sm overflow-hidden">
                  <div className="py-16 px-4 text-center space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <LineChart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">{t('dashboard.comingSoon.title', 'قريباً')}</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      {t('dashboard.comingSoon', 'هذه الميزة قيد التطوير وستكون متاحة قريبًا مع تقارير تحليلية متقدمة')}
                    </p>
                    <Button variant="outline" className="mt-2">تفعيل الإشعارات</Button>
                  </div>
                </Card>
              </AnimateInView>
            </TabsContent>
            
            <TabsContent value="content">
              <AnimateInView animation="fade">
                <Card className="bg-white/70 backdrop-blur-sm border-none shadow-sm overflow-hidden">
                  <div className="py-16 px-4 text-center space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <PieChart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">{t('dashboard.comingSoon.title', 'قريباً')}</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      {t('dashboard.comingSoon', 'هذه الميزة قيد التطوير وستكون متاحة قريبًا لإدارة المحتوى الخاص بك')}
                    </p>
                    <Button variant="outline" className="mt-2">تفعيل الإشعارات</Button>
                  </div>
                </Card>
              </AnimateInView>
            </TabsContent>
            
            <TabsContent value="marketing">
              <AnimateInView animation="fade">
                <Card className="bg-white/70 backdrop-blur-sm border-none shadow-sm overflow-hidden">
                  <div className="py-16 px-4 text-center space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <BarChart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">{t('dashboard.comingSoon.title', 'قريباً')}</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      {t('dashboard.comingSoon', 'هذه الميزة قيد التطوير وستكون متاحة قريبًا مع أدوات تسويقية متقدمة')}
                    </p>
                    <Button variant="outline" className="mt-2">تفعيل الإشعارات</Button>
                  </div>
                </Card>
              </AnimateInView>
            </TabsContent>
          </Tabs>
        </AnimateInView>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
