
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Loader2, Download, Image as ImageIcon, Sparkles, Instagram, Facebook, Share2 } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useToast } from "@/hooks/use-toast";

const AdDesigner = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [adContent, setAdContent] = useState({
    headline: "",
    description: "",
    callToAction: "shop_now",
    platform: "instagram",
    style: "modern",
    color: "#9b87f5",
    imagePrompt: "",
  });
  const [generatedAd, setGeneratedAd] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setAdContent({ ...adContent, [field]: value });
  };

  const handleGenerate = () => {
    setLoading(true);
    
    // Simulate ad generation
    setTimeout(() => {
      // Use a placeholder image for demo
      setGeneratedAd("https://images.unsplash.com/photo-1596704017254-9b5e2a025acf?q=80&w=1080&auto=format&fit=crop");
      setLoading(false);
      
      toast({
        title: t("adDesigner.generationSuccess"),
        description: t("adDesigner.adReady"),
      });
    }, 2000);
  };

  const handleDownload = () => {
    // In a real app, this would download the actual generated ad
    toast({
      title: t("adDesigner.downloadStarted"),
      description: t("adDesigner.downloadDescription"),
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{t("adDesigner.title")}</h1>
        <p className="text-muted-foreground mb-6">{t("adDesigner.description")}</p>

        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[500px]"
        >
          {/* Editor Panel */}
          <ResizablePanel defaultSize={40}>
            <Card className="h-full">
              <CardContent className="p-6">
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="mb-4 w-full">
                    <TabsTrigger value="content">{t("adDesigner.tabs.content")}</TabsTrigger>
                    <TabsTrigger value="design">{t("adDesigner.tabs.design")}</TabsTrigger>
                    <TabsTrigger value="platform">{t("adDesigner.tabs.platform")}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <div>
                      <Label htmlFor="headline">{t("adDesigner.headline")}</Label>
                      <Input 
                        id="headline" 
                        value={adContent.headline}
                        onChange={(e) => handleInputChange("headline", e.target.value)}
                        placeholder={t("adDesigner.headlinePlaceholder")}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">{t("adDesigner.description")}</Label>
                      <Textarea 
                        id="description" 
                        value={adContent.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder={t("adDesigner.descriptionPlaceholder")}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="imagePrompt">{t("adDesigner.imagePrompt")}</Label>
                      <Textarea 
                        id="imagePrompt" 
                        value={adContent.imagePrompt}
                        onChange={(e) => handleInputChange("imagePrompt", e.target.value)}
                        placeholder={t("adDesigner.imagePlaceholder")}
                      />
                    </div>

                    <div>
                      <Label htmlFor="callToAction">{t("adDesigner.callToAction")}</Label>
                      <Select 
                        value={adContent.callToAction}
                        onValueChange={(value) => handleInputChange("callToAction", value)}
                      >
                        <SelectTrigger id="callToAction">
                          <SelectValue placeholder={t("adDesigner.selectCTA")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shop_now">{t("adDesigner.cta.shopNow")}</SelectItem>
                          <SelectItem value="learn_more">{t("adDesigner.cta.learnMore")}</SelectItem>
                          <SelectItem value="sign_up">{t("adDesigner.cta.signUp")}</SelectItem>
                          <SelectItem value="contact_us">{t("adDesigner.cta.contactUs")}</SelectItem>
                          <SelectItem value="book_now">{t("adDesigner.cta.bookNow")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="design" className="space-y-4">
                    <div>
                      <Label>{t("adDesigner.style")}</Label>
                      <RadioGroup 
                        value={adContent.style}
                        onValueChange={(value) => handleInputChange("style", value)}
                        className="flex flex-col space-y-2 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="modern" id="modern" />
                          <Label htmlFor="modern">{t("adDesigner.styles.modern")}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="minimal" id="minimal" />
                          <Label htmlFor="minimal">{t("adDesigner.styles.minimal")}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bold" id="bold" />
                          <Label htmlFor="bold">{t("adDesigner.styles.bold")}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="elegant" id="elegant" />
                          <Label htmlFor="elegant">{t("adDesigner.styles.elegant")}</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="color">{t("adDesigner.color")}</Label>
                      <div className="flex gap-2 mt-2">
                        <Input 
                          id="color" 
                          type="color" 
                          value={adContent.color}
                          onChange={(e) => handleInputChange("color", e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          value={adContent.color}
                          onChange={(e) => handleInputChange("color", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="platform" className="space-y-4">
                    <div>
                      <Label>{t("adDesigner.platform")}</Label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <Button 
                          variant={adContent.platform === "instagram" ? "default" : "outline"} 
                          onClick={() => handleInputChange("platform", "instagram")}
                          className="flex flex-col h-20 gap-2"
                        >
                          <Instagram />
                          <span>{t("adDesigner.platforms.instagram")}</span>
                        </Button>
                        <Button 
                          variant={adContent.platform === "facebook" ? "default" : "outline"}
                          onClick={() => handleInputChange("platform", "facebook")}
                          className="flex flex-col h-20 gap-2"
                        >
                          <Facebook />
                          <span>{t("adDesigner.platforms.facebook")}</span>
                        </Button>
                        <Button 
                          variant={adContent.platform === "pinterest" ? "default" : "outline"}
                          onClick={() => handleInputChange("platform", "pinterest")}
                          className="flex flex-col h-20 gap-2"
                        >
                          <Share2 />
                          <span>{t("adDesigner.platforms.pinterest")}</span>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button 
                  onClick={handleGenerate} 
                  className="w-full mt-6" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("adDesigner.generating")}
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      {t("adDesigner.generateAd")}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Preview Panel */}
          <ResizablePanel defaultSize={60}>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium">{t("adDesigner.preview")}</h3>
                  {generatedAd && (
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="mr-2 h-4 w-4" />
                      {t("adDesigner.download")}
                    </Button>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg h-[400px] flex items-center justify-center border">
                  {generatedAd ? (
                    <div className="relative w-full h-full">
                      <img 
                        src={generatedAd} 
                        alt="Generated Ad" 
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                        {adContent.headline && <h3 className="text-xl font-bold mb-1">{adContent.headline}</h3>}
                        {adContent.description && <p className="text-sm mb-2">{adContent.description}</p>}
                        <Button size="sm" style={{backgroundColor: adContent.color}}>
                          {t(`adDesigner.cta.${adContent.callToAction}`)}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <ImageIcon className="mx-auto h-16 w-16 mb-2 opacity-30" />
                      <p>{t("adDesigner.noPreview")}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Layout>
  );
};

export default AdDesigner;
