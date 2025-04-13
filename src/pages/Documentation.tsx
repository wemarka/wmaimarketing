
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectHeader, { ProjectHeaderProps } from "@/components/documentation/ProjectHeader";
import OverviewTab from "@/components/documentation/OverviewTab";
import PhasesTab from "@/components/documentation/PhasesTab";
import TimelineTab from "@/components/documentation/TimelineTab";
import { PhaseData as TimelinePhaseData } from "@/components/documentation/TimelineTab";

// Define a type that maps the string statuses to the required format
type MappedPhase = Omit<TimelinePhaseData, 'status'> & {
  status: "completed" | "in-progress" | "not-started";
};

const Documentation: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("overview");

  // Project phases data
  const rawPhases = [
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
      status: "not-started",
      progress: 0,
      description: "تحسين أداء النظام وإضافة ميزات جديدة بناءً على التغذية الراجعة",
    },
  ];
  
  // Convert phases to have the correct status type
  const timelinePhases: TimelinePhaseData[] = rawPhases.map(phase => {
    let status: "completed" | "in-progress" | "not-started";
    
    if (phase.status === "completed") {
      status = "completed";
    } else if (phase.status === "in-progress") {
      status = "in-progress";
    } else {
      status = "not-started";
    }
    
    return {
      ...phase,
      status
    };
  });

  // Project header data
  const headerProps: ProjectHeaderProps = {
    title: "نظام إدارة التسويق والمحتوى للعلامة التجارية",
    description: "توثيق شامل لمشروع منصة إدارة المحتوى والتسويق للعلامات التجارية الخاصة بمنتجات العناية والتجميل",
    version: "1.7.0",
    lastUpdated: "14 أبريل 2025"
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <ProjectHeader 
          title={headerProps.title}
          description={headerProps.description}
          version={headerProps.version}
          lastUpdated={headerProps.lastUpdated}
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
            <PhasesTab phases={rawPhases} />
          </TabsContent>

          <TabsContent value="timeline">
            <TimelineTab phases={timelinePhases} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Documentation;
