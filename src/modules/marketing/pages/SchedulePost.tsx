
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, Upload, Sparkles, Loader2, ChevronsDown, LucideIcon, Instagram, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { 
  schedulePost, 
  getScheduledPosts,
  getCampaigns, 
  getSocialAccounts, 
  generateContentSuggestion,
  generateHashtags
} from "../services/schedulerService";

interface SocialPlatformOption {
  value: string;
  label: string;
  icon: LucideIcon;
}

const platformOptions: SocialPlatformOption[] = [
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "facebook", label: "Facebook", icon: Facebook },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "twitter", label: "Twitter", icon: Twitter },
  { value: "youtube", label: "YouTube", icon: Youtube },
];

interface TimeOption {
  value: string;
  label: string;
}

const timeOptions: TimeOption[] = [
  { value: "09:00", label: "9:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "21:00", label: "9:00 PM" },
];

const SchedulePost = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [suggestedContent, setSuggestedContent] = useState("");
  const [platform, setPlatform] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState(timeOptions[0].value);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [socialAccounts, setSocialAccounts] = useState<any[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  useEffect(() => {
    loadCampaigns();
    loadSocialAccounts();
  }, []);
  
  const loadCampaigns = async () => {
    try {
      const campaignsData = await getCampaigns();
      setCampaigns(campaignsData);
    } catch (error) {
      console.error("Error loading campaigns:", error);
    }
  };
  
  const loadSocialAccounts = async () => {
    try {
      const accountsData = await getSocialAccounts();
      setSocialAccounts(accountsData);
    } catch (error) {
      console.error("Error loading social accounts:", error);
    }
  };
  
  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const files = Array.from(event.target.files);
    setMediaFiles(prevFiles => [...prevFiles, ...files]);
    
    // Create preview URLs for the new files
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
  };
  
  const removeMedia = (index: number) => {
    setMediaFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };
  
  const handleGenerateSuggestion = async () => {
    if (!content.trim()) {
      toast.error(t("scheduler.errors.emptyContent"));
      return;
    }
    
    setIsGenerating(true);
    try {
      const suggestion = await generateContentSuggestion(content, platform);
      setSuggestedContent(suggestion);
      
      // Generate hashtags
      const tags = await generateHashtags(content, platform);
      setHashtags(tags);
      
      toast.success(t("scheduler.success.suggestionGenerated"));
    } catch (error) {
      console.error("Error generating suggestions:", error);
      toast.error(t("scheduler.errors.suggestionFailed"));
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !platform || !selectedDate) {
      toast.error(t("scheduler.errors.missingFields"));
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Combine date and time
      const scheduledDate = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':').map(Number);
      scheduledDate.setHours(hours, minutes, 0, 0);
      
      // Upload media files and get URLs
      // For now, just use the preview URLs as placeholders
      const uploadedUrls = previewUrls.length ? previewUrls : [];
      
      // Schedule the post
      await schedulePost({
        title,
        content: suggestedContent || content,
        platform,
        scheduledAt: scheduledDate.toISOString(),
        mediaUrls: uploadedUrls,
        campaignId: selectedCampaign || undefined
      });
      
      toast.success(t("scheduler.success.postScheduled"));
      
      // Reset the form
      setTitle("");
      setContent("");
      setSuggestedContent("");
      setPlatform("");
      setSelectedDate(new Date());
      setSelectedTime(timeOptions[0].value);
      setSelectedCampaign("");
      setHashtags([]);
      setMediaFiles([]);
      setPreviewUrls([]);
      
    } catch (error) {
      console.error("Error scheduling post:", error);
      toast.error(t("scheduler.errors.schedulingFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
                <div className="space-y-3">
                  <Label htmlFor="title">{t("scheduler.contentSection.title")}</Label>
                  <Input
                    id="title"
                    placeholder={t("scheduler.contentSection.titlePlaceholder")}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="content">{t("scheduler.contentSection.content")}</Label>
                  <Textarea
                    id="content"
                    placeholder={t("scheduler.contentSection.contentPlaceholder")}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="secondary"
                    onClick={handleGenerateSuggestion}
                    disabled={isGenerating || !content.trim()}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("common.generating")}
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        {t("scheduler.contentSection.generateSuggestion")}
                      </>
                    )}
                  </Button>
                </div>

                {suggestedContent && (
                  <div className="space-y-3 bg-secondary/30 p-4 rounded-md">
                    <Label htmlFor="suggestedContent">{t("scheduler.contentSection.suggestedContent")}</Label>
                    <Textarea
                      id="suggestedContent"
                      value={suggestedContent}
                      onChange={(e) => setSuggestedContent(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    
                    {hashtags.length > 0 && (
                      <div>
                        <Label>{t("scheduler.contentSection.suggestedHashtags")}</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {hashtags.map((tag, index) => (
                            <div
                              key={index}
                              className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                            >
                              #{tag}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label htmlFor="media" className="block mb-3">
                      {t("scheduler.mediaSection.uploadMedia")}
                    </Label>
                    
                    <div className="flex items-center justify-center w-full">
                      <Label
                        htmlFor="media"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/30 hover:bg-secondary/40"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            {t("scheduler.mediaSection.dragAndDrop")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t("scheduler.mediaSection.supportedFormats")}
                          </p>
                        </div>
                        <Input
                          id="media"
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          onChange={handleMediaChange}
                          multiple
                        />
                      </Label>
                    </div>
                  </div>
                  
                  {previewUrls.length > 0 && (
                    <div>
                      <Label className="block mb-3">{t("scheduler.mediaSection.preview")}</Label>
                      <div className="grid grid-cols-3 gap-4">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-md"
                            />
                            <button
                              className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeMedia(index)}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
              <CardContent className="flex-grow space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="platform">{t("scheduler.settingsSection.platform")}</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("scheduler.settingsSection.selectPlatform")} />
                    </SelectTrigger>
                    <SelectContent>
                      {platformOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="flex items-center">
                          <div className="flex items-center">
                            <option.icon className="h-4 w-4 ml-1 text-muted-foreground" />
                            <span className="ml-2">{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label>{t("scheduler.settingsSection.date")}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {selectedDate ? (
                          <span>{format(selectedDate, "PPP")}</span>
                        ) : (
                          <span>{t("scheduler.settingsSection.pickDate")}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-3">
                  <Label>{t("scheduler.settingsSection.time")}</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("scheduler.settingsSection.selectTime")} />
                      <Clock className="h-4 w-4 ml-auto" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {campaigns.length > 0 && (
                  <div className="space-y-3">
                    <Label htmlFor="campaign">{t("scheduler.settingsSection.campaign")}</Label>
                    <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("scheduler.settingsSection.selectCampaign")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">{t("scheduler.settingsSection.noCampaign")}</SelectItem>
                        {campaigns.map((campaign) => (
                          <SelectItem key={campaign.id} value={campaign.id}>
                            {campaign.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !title || !content || !platform || !selectedDate}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("common.scheduling")}
                    </>
                  ) : (
                    t("scheduler.settingsSection.scheduleButton")
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchedulePost;
