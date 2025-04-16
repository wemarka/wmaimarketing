
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Helmet } from "react-helmet-async";
import OverviewTab from "@/modules/dashboard/components/tabs/OverviewTab";
import SectionTitle from "@/components/dashboard/SectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { LineChart, Activity, PieChart, BarChart } from "lucide-react";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  
  // تأثيرات الحركة للصفحة
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
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
    
  return (
    <Layout>
      <Helmet>
        <title>{t('dashboard.title', 'لوحة التحكم')} - سيركل</title>
      </Helmet>
      <motion.div 
        className="w-full transition-all space-y-6"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        {/* Header Section with Greeting */}
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-none bg-gradient-to-r from-[#3a7a89]/10 to-[#4a8a99]/5 mb-6">
            <div className="p-6 space-y-2">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {getGreetingTime()}, {displayName}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t('dashboard.welcome', 'مرحبًا بعودتك! هذه هي النظرة العامة على حساباتك.')}
              </p>
            </div>
          </Card>
        </motion.div>
        
        {/* Tab Navigation */}
        <motion.div variants={itemVariants}>
          <Tabs 
            defaultValue="overview" 
            value={activeTab}
            onValueChange={setActiveTab} 
            className="space-y-4"
          >
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
            
            <TabsContent value="overview" className="space-y-6">
              <motion.div variants={itemVariants}>
                <SectionTitle
                  title={t('dashboard.overview.title', 'نظرة عامة')}
                  subtitle={t('dashboard.overview.subtitle', 'تتبع أداء حساباتك وتفاعلات الجمهور')}
                  variant="gradient"
                  size="lg"
                  icon={<Activity className="w-5 h-5" />}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <OverviewTab />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <SectionTitle
                title={t('dashboard.analytics.title', 'التحليلات')}
                subtitle={t('dashboard.analytics.subtitle', 'استعرض تحليلات متقدمة لحملاتك')}
                variant="primary"
                icon={<LineChart className="w-5 h-5" />}
              />
              
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('dashboard.comingSoon', 'هذه الميزة قيد التطوير وستكون متاحة قريبًا')}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="content">
              <SectionTitle
                title={t('dashboard.content.title', 'المحتوى')}
                subtitle={t('dashboard.content.subtitle', 'إدارة محتوى وسائل التواصل الاجتماعي الخاصة بك')}
                variant="secondary"
                icon={<PieChart className="w-5 h-5" />}
              />
              
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('dashboard.comingSoon', 'هذه الميزة قيد التطوير وستكون متاحة قريبًا')}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="marketing">
              <SectionTitle
                title={t('dashboard.marketing.title', 'التسويق')}
                subtitle={t('dashboard.marketing.subtitle', 'خطط وتتبع حملاتك التسويقية')}
                variant="primary"
                icon={<BarChart className="w-5 h-5" />}
              />
              
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('dashboard.comingSoon', 'هذه الميزة قيد التطوير وستكون متاحة قريبًا')}</p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
