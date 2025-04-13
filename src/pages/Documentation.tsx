
import React from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";

// Import new component files
import ProjectHeader from "@/components/documentation/ProjectHeader";
import OverviewTab from "@/components/documentation/OverviewTab";
import PhasesTab from "@/components/documentation/PhasesTab";
import TimelineTab from "@/components/documentation/TimelineTab";
import NextStepCard from "@/components/documentation/NextStepCard";

const Documentation = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <ProjectHeader />

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="phases">مراحل التطوير</TabsTrigger>
            <TabsTrigger value="timeline">الجدول الزمني</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>
          
          <TabsContent value="phases">
            <PhasesTab />
          </TabsContent>
          
          <TabsContent value="timeline">
            <TimelineTab />
          </TabsContent>
        </Tabs>

        <NextStepCard />
      </div>
    </Layout>
  );
};

export default Documentation;
