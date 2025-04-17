import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart, DoughnutChart } from "@/components/ui/charts";
import SectionTitle from "@/components/dashboard/SectionTitle";
import { useTranslation } from "react-i18next";
import { BarChart2, LineChart, PieChart, Activity } from "lucide-react";

const DashboardInteractions = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  const [activeTab, setActiveTab] = useState("overview");
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };
  
  return (
    <Layout>
      <Helmet>
        <title>{t("analytics.interactions.title", "تحليل التفاعلات")} - سيركل</title>
      </Helmet>
      
      <motion.div 
        className="p-6 space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <motion.div variants={itemVariants}>
          <SectionTitle
            title={t("analytics.interactions.title", "تحليل التفاعلات")}
            subtitle={t("analytics.interactions.subtitle", "قياس وتتبع تفاعلات المستخدمين مع المحتوى والمنشورات عبر المنصات")}
            variant="gradient"
            size="lg"
            icon={<Activity className="w-5 h-5" />}
            animated={true}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Tabs 
            defaultValue="overview" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="bg-white/10 dark:bg-slate-800/20 p-1 rounded-xl overflow-x-auto hide-scrollbar w-full md:w-auto flex flex-nowrap">
              <TabsTrigger 
                value="overview" 
                className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 rounded-lg"
              >
                <Activity size={18} />
                <span>{t("common.overview", "النظرة العامة")}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="engagement" 
                className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 rounded-lg"
              >
                <BarChart2 size={18} />
                <span>{t("common.engagement", "معدل التفاعل")}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reach" 
                className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 rounded-lg"
              >
                <LineChart size={18} />
                <span>{t("common.reach", "الوصول")}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="demographics" 
                className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 rounded-lg"
              >
                <PieChart size={18} />
                <span>{t("common.demographics", "البيانات الديموغرافية")}</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Metrics Overview Cards */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className="overflow-hidden border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors group dark:hover:border-primary/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{t("analytics.interactions.totalInteractions", "إجمالي التفاعلات")}</span>
                        <motion.div
                          whileHover={{ rotate: 15 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-emerald-500/10 p-2 rounded-full text-emerald-500"
                        >
                          <Activity size={18} />
                        </motion.div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold group-hover:text-primary transition-colors">24,521</div>
                      <p className="text-sm text-muted-foreground mt-1">+15% {t("common.fromLastMonth", "من الشهر الماضي")}</p>
                      <div className="h-32 mt-4">
                        <AreaChart />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card className="overflow-hidden border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors group dark:hover:border-primary/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{t("analytics.interactions.engagementRate", "معدل التفاعل")}</span>
                        <motion.div
                          whileHover={{ rotate: 15 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-blue-500/10 p-2 rounded-full text-blue-500"
                        >
                          <BarChart2 size={18} />
                        </motion.div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold group-hover:text-primary transition-colors">5.8%</div>
                      <p className="text-sm text-muted-foreground mt-1">+0.8% {t("common.fromLastMonth", "من الشهر الماضي")}</p>
                      <div className="h-32 mt-4">
                        <AreaChart />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card className="overflow-hidden border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors group dark:hover:border-primary/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{t("analytics.interactions.averageTime", "متوسط وقت التفاعل")}</span>
                        <motion.div
                          whileHover={{ rotate: 15 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-purple-500/10 p-2 rounded-full text-purple-500"
                        >
                          <LineChart size={18} />
                        </motion.div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold group-hover:text-primary transition-colors">2:45</div>
                      <p className="text-sm text-muted-foreground mt-1">+30 {t("common.seconds", "ثانية")} {t("common.fromLastMonth", "من الشهر الماضي")}</p>
                      <div className="h-32 mt-4">
                        <AreaChart />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
              
              {/* Charts Section */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="col-span-1 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <PieChart size={18} className="text-indigo-500" />
                      {t("analytics.interactions.distributionByPlatform", "توزيع التفاعلات حسب المنصة")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <DoughnutChart />
                  </CardContent>
                </Card>
                
                <Card className="col-span-1 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart2 size={18} className="text-amber-500" />
                      {t("analytics.interactions.byContentType", "تفاعلات حسب نوع المحتوى")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <BarChart />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="engagement" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 size={18} className="text-blue-500" />
                    {t("analytics.interactions.engagementAnalysis", "تحليل معدلات التفاعل")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className="h-96 bg-muted/10 rounded-lg flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-muted">{t("common.contentInDevelopment", "محتوى قيد التطوير")}</p>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reach" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart size={18} className="text-green-500" />
                    {t("analytics.interactions.reachAnalysis", "تحليل الوصول")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className="h-96 bg-muted/10 rounded-lg flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-muted">{t("common.contentInDevelopment", "محتوى قيد التطوير")}</p>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="demographics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart size={18} className="text-purple-500" />
                    {t("analytics.interactions.demographics", "البيانات الديموغرافية")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className="h-96 bg-muted/10 rounded-lg flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-muted">{t("common.contentInDevelopment", "محتوى قيد التطوير")}</p>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default DashboardInteractions;
