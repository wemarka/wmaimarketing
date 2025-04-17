
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarPlus, Settings } from "lucide-react";
import { useSchedulePost } from "../hooks/useSchedulePost";
import TitleSection from "../components/schedule-post/TitleSection";
import ContentSection from "../components/schedule-post/ContentSection";
import MediaSection from "../components/schedule-post/MediaSection";
import SettingsSection from "../components/schedule-post/SettingsSection";
import CampaignSection from "../components/schedule-post/CampaignSection";
import CrossPostingSection from "../components/schedule-post/CrossPostingSection";
import PageHeader from "@/components/layout/PageHeader";
import AnimateInView from "@/components/ui/animate-in-view";

const SchedulePost = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("content");
  const {
    title,
    content,
    suggestedContent,
    platform,
    selectedDate,
    selectedTime,
    campaigns,
    selectedCampaign,
    socialAccounts,
    selectedAccounts,
    hashtags,
    previewUrls,
    enableCrossPosting,
    isGenerating,
    isSubmitting,
    
    setTitle,
    setContent,
    setSuggestedContent,
    setPlatform,
    setSelectedDate,
    setSelectedTime,
    setSelectedCampaign,
    
    handleAccountToggle,
    toggleCrossPosting,
    handleMediaChange,
    removeMedia,
    handleGenerateSuggestion,
    handleSubmit,
    resetForm
  } = useSchedulePost();

  // Helper function to handle file input change events
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      handleMediaChange(files);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{t("scheduler.title", "جدولة منشور")} - سيركل</title>
      </Helmet>
      
      <AnimateInView animation="fade">
        <PageHeader
          title={t("scheduler.title", "جدولة منشور")}
          description={t("scheduler.description", "قم بإنشاء وجدولة منشور جديد على منصات التواصل الاجتماعي.")}
          variant="default"
          icon={<CalendarPlus className="w-5 h-5" />}
        />
      </AnimateInView>

      <div className="container py-6 max-w-4xl">
        <AnimateInView animation="slide-up" delay={0.1}>
          <Card>
            <CardContent className="p-6">
              <Tabs 
                defaultValue="content" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content" className="flex items-center gap-2">
                    <span>{t("scheduler.tabs.content", "المحتوى والوسائط")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>{t("scheduler.tabs.settings", "الإعدادات والجدولة")}</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="py-6 space-y-8">
                  <TitleSection 
                    title={title} 
                    setTitle={setTitle}
                  />
                  
                  <ContentSection
                    title={title}
                    setTitle={setTitle}
                    content={content}
                    setContent={setContent}
                    suggestedContent={suggestedContent}
                    setSuggestedContent={setSuggestedContent}
                    isGenerating={isGenerating}
                    onGenerateSuggestion={handleGenerateSuggestion}
                    hashtags={hashtags}
                  />
                  
                  <MediaSection
                    previewUrls={previewUrls}
                    onMediaChange={handleFileInputChange}
                    onRemoveMedia={removeMedia}
                  />
                </TabsContent>

                <TabsContent value="settings" className="py-6 space-y-8">
                  <SettingsSection
                    platform={platform}
                    setPlatform={setPlatform}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    selectedCampaign={selectedCampaign}
                    setSelectedCampaign={setSelectedCampaign}
                    campaigns={campaigns}
                    isSubmitting={isSubmitting}
                    handleSubmit={handleSubmit}
                    title={title}
                    content={content}
                  />
                  
                  {platform && (
                    <>
                      <CampaignSection
                        campaigns={campaigns}
                        selectedCampaign={selectedCampaign}
                        onCampaignChange={setSelectedCampaign}
                      />
                      
                      <CrossPostingSection
                        accounts={socialAccounts}
                        enableCrossPosting={enableCrossPosting}
                        selectedAccounts={selectedAccounts}
                        onToggleCrossPosting={toggleCrossPosting}
                        onAccountToggle={handleAccountToggle}
                      />
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </AnimateInView>
      </div>
    </Layout>
  );
};

export default SchedulePost;
