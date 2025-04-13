
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectHeader from "@/components/documentation/ProjectHeader";
import OverviewTab from "@/components/documentation/OverviewTab";
import PhasesTab from "@/components/documentation/PhasesTab";
import TimelineTab from "@/components/documentation/TimelineTab";

const Documentation = () => {
  const [currentTab, setCurrentTab] = useState("overview");

  // Project phases data
  const phases = [
    {
      id: 1,
      name: "تصميم وتخطيط النظام",
      status: "completed",
      progress: 100,
      description: "تصميم هيكل النظام والواجهات وقواعد البيانات وتدفق العمل",
    },
    {
      id: 2,
      name: "بناء النماذج الأولية",
      status: "completed",
      progress: 100,
      description: "إنشاء نماذج أولية للواجهات والمكونات الرئيسية",
    },
    {
      id: 3,
      name: "تطوير نظام إدارة المحتوى",
      status: "completed",
      progress: 100,
      description: "بناء أدوات إنشاء وتنظيم المحتوى البصري والنصي",
    },
    {
      id: 4,
      name: "تطوير نظام الجدولة والنشر",
      status: "completed",
      progress: 100,
      description: "بناء نظام جدولة ونشر المحتوى على منصات التواصل الاجتماعي",
    },
    {
      id: 5,
      name: "تطوير نظام الإعلانات",
      status: "completed",
      progress: 100,
      description: "بناء نظام إنشاء وإدارة الحملات الإعلانية",
    },
    {
      id: 6,
      name: "تطوير نظام التحليلات",
      status: "completed",
      progress: 100,
      description: "بناء نظام تتبع وتحليل أداء المحتوى والإعلانات",
    },
    {
      id: 7,
      name: "التكامل والتوسع",
      status: "completed",
      progress: 100,
      description: "تكامل النظام مع الأنظمة الخارجية وإضافة ميزات متقدمة",
    },
    {
      id: 8,
      name: "التحسين المستمر",
      status: "planned",
      progress: 0,
      description: "تحسين أداء النظام وإضافة ميزات جديدة بناءً على التغذية الراجعة",
    },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <ProjectHeader
          title="نظام إدارة التسويق والمحتوى للعلامة التجارية"
          description="توثيق شامل لمشروع منصة إدارة المحتوى والتسويق للعلامات التجارية الخاصة بمنتجات العناية والتجميل"
          version="1.7.0"
          lastUpdated="14 أبريل 2025"
        />

        <Tabs
          defaultValue="overview"
          value={currentTab}
          onValueChange={setCurrentTab}
          className="mt-6"
        >
          <TabsList className="mb-8">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="phases">مراحل المشروع</TabsTrigger>
            <TabsTrigger value="timeline">الجدول الزمني</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="phases">
            <PhasesTab phases={phases} />
          </TabsContent>

          <TabsContent value="timeline">
            <TimelineTab phases={phases} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Documentation;
