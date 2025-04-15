
import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ContentSection from "../components/schedule-post/ContentSection";
import MediaSection from "../components/schedule-post/MediaSection";
import SettingsSection from "../components/schedule-post/SettingsSection";
import CrossPostSection from "../components/schedule-post/CrossPostSection";
import { useSchedulePost } from "../hooks/useSchedulePost";
import { Separator } from "@/components/ui/separator";

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
    handleSubmit,
    socialAccounts,
    selectedAccounts,
    enableCrossPosting,
    toggleCrossPosting,
    handleAccountToggle
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
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("scheduler.settingsSection.title")}</CardTitle>
                <CardDescription>
                  {t("scheduler.settingsSection.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
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

            {/* إضافة خيار تفعيل المشاركة المتعددة */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t("scheduler.crossPostingSection.title", "المشاركة المتعددة")}</CardTitle>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="cross-posting"
                      checked={enableCrossPosting}
                      onCheckedChange={toggleCrossPosting}
                      disabled={!platform}
                    />
                    <Label htmlFor="cross-posting">{enableCrossPosting ? "مفعّل" : "معطّل"}</Label>
                  </div>
                </div>
                <CardDescription>
                  {t("scheduler.crossPostingSection.description", "نشر المحتوى تلقائياً على منصات متعددة في نفس الوقت")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {enableCrossPosting ? (
                  <CrossPostSection
                    accounts={socialAccounts.filter(account => account.status === "connected")}
                    selectedAccounts={selectedAccounts}
                    onAccountToggle={handleAccountToggle}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 text-center text-muted-foreground">
                    <p className="mb-2">
                      {t("scheduler.crossPostingSection.disabled", "فعّل المشاركة المتعددة لنشر المحتوى على عدة منصات في نفس الوقت")}
                    </p>
                    {!platform && (
                      <p className="text-sm">
                        {t("scheduler.crossPostingSection.selectPlatform", "الرجاء اختيار منصة أولاً")}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchedulePost;
