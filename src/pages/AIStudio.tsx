
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIOverview from "@/components/ai/AIOverview";
import ImageGenerator from "@/components/ai/ImageGenerator";
import ContentEnhancer from "@/components/ai/ContentEnhancer";
import VideoIdeaGenerator from "@/components/ai/VideoIdeaGenerator";
import ContentAnalyzer from "@/components/ai/ContentAnalyzer";
import { useTranslation } from "react-i18next";

const AIStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <Tabs 
          defaultValue="overview" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6 flex flex-wrap justify-center">
            <TabsTrigger value="overview">{t("aiStudio.tabs.overview")}</TabsTrigger>
            <TabsTrigger value="images">{t("aiStudio.tabs.images")}</TabsTrigger>
            <TabsTrigger value="content">{t("aiStudio.tabs.content")}</TabsTrigger>
            <TabsTrigger value="video">{t("aiStudio.tabs.video")}</TabsTrigger>
            <TabsTrigger value="analyzer">{t("aiStudio.tabs.analyzer")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <AIOverview />
          </TabsContent>
          
          <TabsContent value="images">
            <div className="animate-in fade-in duration-300">
              <ImageGenerator />
            </div>
          </TabsContent>
          
          <TabsContent value="content">
            <div className="animate-in fade-in duration-300">
              <ContentEnhancer />
            </div>
          </TabsContent>
          
          <TabsContent value="video">
            <div className="animate-in fade-in duration-300">
              <VideoIdeaGenerator />
            </div>
          </TabsContent>
          
          <TabsContent value="analyzer">
            <div className="animate-in fade-in duration-300">
              <ContentAnalyzer />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AIStudio;
