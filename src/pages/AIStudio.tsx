
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIOverview from "@/components/ai/AIOverview";
import ImageGenerator from "@/components/ai/ImageGenerator";
import ContentEnhancer from "@/components/ai/ContentEnhancer";
import VideoIdeaGenerator from "@/components/ai/VideoIdeaGenerator";
import ContentAnalyzer from "@/components/ai/ContentAnalyzer";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const AIStudio: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Get tab from URL query parameter or default to "overview"
  const getTabFromQuery = () => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");
    return tab && ["overview", "images", "content", "video", "analyzer"].includes(tab) 
      ? tab 
      : "overview";
  };
  
  const [activeTab, setActiveTab] = useState(getTabFromQuery());
  
  // Update URL when tab changes
  useEffect(() => {
    const currentTab = getTabFromQuery();
    if (currentTab !== activeTab) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("tab", activeTab);
      navigate({
        pathname: location.pathname,
        search: searchParams.toString()
      }, { replace: true });
    }
  }, [activeTab, location, navigate]);
  
  // Update tab state when URL changes
  useEffect(() => {
    setActiveTab(getTabFromQuery());
  }, [location]);

  const fadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -5, transition: { duration: 0.2 } }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Layout>
      <motion.div 
        className="max-w-7xl mx-auto px-4 py-8 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs 
          defaultValue="overview" 
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <TabsList className="mb-6 flex flex-wrap justify-center">
              <TabsTrigger value="overview">{t("aiStudio.tabs.overview")}</TabsTrigger>
              <TabsTrigger value="images">{t("aiStudio.tabs.images")}</TabsTrigger>
              <TabsTrigger value="content">{t("aiStudio.tabs.content")}</TabsTrigger>
              <TabsTrigger value="video">{t("aiStudio.tabs.video")}</TabsTrigger>
              <TabsTrigger value="analyzer">{t("aiStudio.tabs.analyzer")}</TabsTrigger>
            </TabsList>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <TabsContent value="overview" forceMount>
                <motion.div
                  key="overview"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <AIOverview />
                </motion.div>
              </TabsContent>
            )}
            
            {activeTab === "images" && (
              <TabsContent value="images" forceMount>
                <motion.div
                  key="images"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ImageGenerator />
                </motion.div>
              </TabsContent>
            )}
            
            {activeTab === "content" && (
              <TabsContent value="content" forceMount>
                <motion.div
                  key="content"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ContentEnhancer />
                </motion.div>
              </TabsContent>
            )}
            
            {activeTab === "video" && (
              <TabsContent value="video" forceMount>
                <motion.div
                  key="video"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <VideoIdeaGenerator />
                </motion.div>
              </TabsContent>
            )}
            
            {activeTab === "analyzer" && (
              <TabsContent value="analyzer" forceMount>
                <motion.div
                  key="analyzer"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ContentAnalyzer />
                </motion.div>
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </Layout>
  );
};

export default AIStudio;
