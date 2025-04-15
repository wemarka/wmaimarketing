
import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContentSection from "../components/schedule-post/ContentSection";
import MediaSection from "../components/schedule-post/MediaSection";
import SettingsSection from "../components/schedule-post/SettingsSection";
import { useSchedulePost } from "../hooks/useSchedulePost";

const SchedulePost = () => {
  const { t } = useTranslation();
  const {
    title,
    setTitle,
    content,
    setContent,
    suggestedContent,
    setSuggestedContent,
    platform,
    setPlatform,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    isGenerating,
    isSubmitting,
    campaigns,
    selectedCampaign,
    setSelectedCampaign,
    hashtags,
    previewUrls,
    handleMediaChange,
    removeMedia,
    handleGenerateSuggestion,
    handleSubmit
  } = useSchedulePost();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{t("scheduler.title")}</h1>
            <p className="text-muted-foreground mt-1">{t("scheduler.subtitle")}</p>
          </div>
          <Button variant="outline" onClick={() => window.history.back()}>
            {t("common.back")}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("scheduler.contentSection.title")}</CardTitle>
                <CardDescription>
                  {t("scheduler.contentSection.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ContentSection
                  title={title}
                  setTitle={setTitle}
                  content={content}
                  setContent={setContent}
                  suggestedContent={suggestedContent}
                  setSuggestedContent={setSuggestedContent}
                  hashtags={hashtags}
                  isGenerating={isGenerating}
                  onGenerateSuggestion={handleGenerateSuggestion}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("scheduler.mediaSection.title")}</CardTitle>
                <CardDescription>
                  {t("scheduler.mediaSection.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MediaSection
                  previewUrls={previewUrls}
                  handleMediaChange={handleMediaChange}
                  removeMedia={removeMedia}
                />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{t("scheduler.settingsSection.title")}</CardTitle>
                <CardDescription>
                  {t("scheduler.settingsSection.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchedulePost;
