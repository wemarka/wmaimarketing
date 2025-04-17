
import React from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSchedulePost } from "@/modules/marketing/hooks/useSchedulePost";
import TitleSection from "@/modules/marketing/components/schedule-post/TitleSection";
import MediaSection from "@/modules/marketing/components/schedule-post/MediaSection";
import SettingsSection from "@/modules/marketing/components/schedule-post/SettingsSection";
import CrossPostingSection from "@/modules/marketing/components/schedule-post/CrossPostingSection";
import SuggestedContentSection from "@/modules/marketing/components/schedule-post/SuggestedContentSection";

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
    campaigns,
    selectedCampaign,
    setSelectedCampaign,
    socialAccounts,
    selectedAccounts,
    handleAccountToggle,
    enableCrossPosting,
    toggleCrossPosting,
    handleMediaChange,
    removeMedia,
    previewUrls,
    handleGenerateSuggestion,
    handleSubmit,
    isSubmitting,
    isGenerating,
  } = useSchedulePost();

  return (
    <Layout>
      <Helmet>
        <title>{t("schedulePost.title", "جدولة منشور جديد")} - سيركل</title>
      </Helmet>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">{t("schedulePost.heading", "جدولة منشور جديد")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <TitleSection
                  title={title}
                  content={content}
                  onChangeTitle={setTitle}
                  onChangeContent={setContent}
                />
              </CardContent>
            </Card>

            <MediaSection
              previewUrls={previewUrls}
              onMediaChange={handleMediaChange}
              onRemoveMedia={removeMedia}
            />

            <SuggestedContentSection
              content={content}
              suggestedContent={suggestedContent}
              onApplySuggestion={() => setContent(suggestedContent)}
              onGenerateSuggestion={handleGenerateSuggestion}
              isGenerating={isGenerating}
              platform={platform}
            />

            <CrossPostingSection
              accounts={socialAccounts}
              enableCrossPosting={enableCrossPosting}
              selectedAccounts={selectedAccounts}
              onToggleCrossPosting={toggleCrossPosting}
              onAccountToggle={handleAccountToggle}
            />
          </div>

          <div>
            <div className="sticky top-24">
              <Card>
                <CardContent className="pt-6">
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
      </div>
    </Layout>
  );
};

export default SchedulePost;
