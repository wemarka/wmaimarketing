
import React from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart, DoughnutChart } from "@/components/ui/charts";

const DashboardInteractions = () => {
  return (
    <Layout>
      <Helmet>
        <title>تحليل التفاعلات - سيركل</title>
      </Helmet>
      
      <div className="p-6 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold mb-2">تحليل التفاعلات</h1>
          <p className="text-muted-foreground">قياس وتتبع تفاعلات المستخدمين مع المحتوى والمنشورات عبر المنصات</p>
        </motion.div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">النظرة العامة</TabsTrigger>
            <TabsTrigger value="engagement">معدل التفاعل</TabsTrigger>
            <TabsTrigger value="reach">الوصول</TabsTrigger>
            <TabsTrigger value="demographics">البيانات الديموغرافية</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">إجمالي التفاعلات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">24,521</div>
                  <p className="text-sm text-muted-foreground mt-1">+15% من الشهر الماضي</p>
                  <div className="h-32 mt-4">
                    <AreaChart />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">معدل التفاعل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">5.8%</div>
                  <p className="text-sm text-muted-foreground mt-1">+0.8% من الشهر الماضي</p>
                  <div className="h-32 mt-4">
                    <AreaChart />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">متوسط وقت التفاعل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2:45</div>
                  <p className="text-sm text-muted-foreground mt-1">+30 ثانية من الشهر الماضي</p>
                  <div className="h-32 mt-4">
                    <AreaChart />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">توزيع التفاعلات حسب المنصة</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <DoughnutChart />
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">تفاعلات حسب نوع المحتوى</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <BarChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>تحليل معدلات التفاعل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-muted/10 rounded-lg flex items-center justify-center">
                  <p className="text-muted">محتوى قيد التطوير</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reach" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>تحليل الوصول</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-muted/10 rounded-lg flex items-center justify-center">
                  <p className="text-muted">محتوى قيد التطوير</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="demographics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>البيانات الديموغرافية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-muted/10 rounded-lg flex items-center justify-center">
                  <p className="text-muted">محتوى قيد التطوير</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DashboardInteractions;
