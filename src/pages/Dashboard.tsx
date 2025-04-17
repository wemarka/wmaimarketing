
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Helmet } from "react-helmet-async";
import OverviewTab from "@/modules/dashboard/components/tabs/OverviewTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { LineChart, Activity, PieChart, BarChart, LayoutDashboard } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import AnimateInView from "@/components/ui/animate-in-view";
import { Button } from "@/components/ui/button";

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

  const actions = (
    <>
      <Button variant="outline" size="sm">
        {t('dashboard.actions.export', 'تصدير')}
      </Button>
      <Button variant="default" size="sm">
        {t('dashboard.actions.refresh', 'تحديث')}
      </Button>
    </>
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
              <AnimateInView animation="fade" delay={0.1}>
                <OverviewTab />
              </AnimateInView>
            </TabsContent>
            
            <TabsContent value="analytics">
              <AnimateInView animation="fade">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t('dashboard.comingSoon', 'هذه الميزة قيد التطوير وستكون متاحة قريبًا')}</p>
                </div>
              </AnimateInView>
            </TabsContent>
            
            <TabsContent value="content">
              <AnimateInView animation="fade">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t('dashboard.comingSoon', 'هذه الميزة قيد التطوير وستكون متاحة قريبًا')}</p>
                </div>
              </AnimateInView>
            </TabsContent>
            
            <TabsContent value="marketing">
              <AnimateInView animation="fade">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t('dashboard.comingSoon', 'هذه الميزة قيد التطوير وستكون متاحة قريبًا')}</p>
                </div>
              </AnimateInView>
            </TabsContent>
          </Tabs>
        </AnimateInView>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
