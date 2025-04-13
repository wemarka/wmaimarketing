
import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, Download, ImageIcon, Sparkles, LayoutTemplate, Settings, Library } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useToast } from "@/hooks/use-toast";

import { adSizesConfig, type SizeOption } from "@/components/ad-designer/adSizesConfig";
import { platformRecommendations, getPlatformRecommendation } from "@/components/ad-designer/platformRecommendations";
import AdContent from "@/components/ad-designer/AdContent";
import DesignSettings from "@/components/ad-designer/DesignSettings";
import PlatformSelection from "@/components/ad-designer/PlatformSelection";
import SizeSelection from "@/components/ad-designer/SizeSelection";
import AdPreview from "@/components/ad-designer/AdPreview";
import TemplateSelector from "@/components/ad-designer/TemplateSelector";
import AssetLibrarySelector from "@/components/ad-designer/AssetLibrarySelector";
import AdvancedOptions from "@/components/ad-designer/AdvancedOptions";

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
    imageUrl: "",
    adSize: "square",
    effectStyle: "none",
    fontSize: 100,
    overlayOpacity: 0,
    showLogo: true,
    brandPosition: "bottom",
    customFont: "default",
    textShadow: false,
    customWidth: 1080,
    customHeight: 1080,
    alignmentX: "center",
    alignmentY: "middle",
  });
  const [generatedAd, setGeneratedAd] = useState<string | null>(null);
  const [isAssetLibraryOpen, setIsAssetLibraryOpen] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setAdContent({ ...adContent, [field]: value });
  };

  const handlePlatformChange = (platform: string) => {
    // Update platform and set default ad size for that platform
    const defaultSize = adSizesConfig[platform]?.[0]?.id || "square";
    setAdContent({ 
      ...adContent, 
      platform, 
      adSize: defaultSize
    });
  };

  const handleGenerate = () => {
    setLoading(true);
    
    setTimeout(() => {
      setGeneratedAd(adContent.imageUrl || "https://images.unsplash.com/photo-1596704017254-9b5e2a025acf?q=80&w=1080&auto=format&fit=crop");
      setLoading(false);
      
      toast({
        title: t("adDesigner.generationSuccess"),
        description: t("adDesigner.adReady"),
      });
    }, 2000);
  };

  const handleDownload = () => {
    toast({
      title: t("adDesigner.downloadStarted"),
      description: t("adDesigner.downloadDescription"),
    });
  };

  const handleApplyTemplate = (templateContent: typeof adContent) => {
    setAdContent({ ...adContent, ...templateContent });
  };

  const handleSelectImage = (imageUrl: string) => {
    setAdContent({ ...adContent, imageUrl });
    setGeneratedAd(imageUrl);
  };

  const getAdSizeConfig = useMemo(() => {
    const platformSizes = adSizesConfig[adContent.platform as keyof typeof adSizesConfig] || adSizesConfig.instagram;
    return platformSizes.find(size => size.id === adContent.adSize) || platformSizes[0];
  }, [adContent.platform, adContent.adSize]);

  const currentPlatformRecommendations = useMemo(() => {
    return getPlatformRecommendation(adContent.platform);
  }, [adContent.platform]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{t("adDesigner.title")}</h1>
        <p className="text-muted-foreground mb-6">{t("adDesigner.description")}</p>

        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[600px]"
        >
          <ResizablePanel defaultSize={40} minSize={30}>
            <Card className="h-full">
              <CardContent className="p-6">
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="mb-4 w-full">
                    <TabsTrigger value="templates">
                      <LayoutTemplate className="h-4 w-4 mr-2" />
                      {t("adDesigner.tabs.templates")}
                    </TabsTrigger>
                    <TabsTrigger value="content">{t("adDesigner.tabs.content")}</TabsTrigger>
                    <TabsTrigger value="design">{t("adDesigner.tabs.design")}</TabsTrigger>
                    <TabsTrigger value="platform">{t("adDesigner.tabs.platform")}</TabsTrigger>
                    <TabsTrigger value="sizes">{t("adDesigner.tabs.sizes")}</TabsTrigger>
                    <TabsTrigger value="advanced">
                      <Settings className="h-4 w-4 mr-2" />
                      {t("adDesigner.tabs.advanced")}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="templates">
                    <h3 className="text-lg font-medium mb-2">{t("adDesigner.templates.title")}</h3>
                    <TemplateSelector onSelectTemplate={handleApplyTemplate} />
                  </TabsContent>

                  <TabsContent value="content" className="space-y-4">
                    <AdContent 
                      adContent={adContent} 
                      onInputChange={handleInputChange}
                      onOpenAssetLibrary={() => setIsAssetLibraryOpen(true)}
                    />
                  </TabsContent>

                  <TabsContent value="design" className="space-y-4">
                    <DesignSettings 
                      adContent={adContent} 
                      onInputChange={handleInputChange}
                      colorRecommendations={currentPlatformRecommendations.colorRecommendations}
                    />
                  </TabsContent>

                  <TabsContent value="platform" className="space-y-4">
                    <PlatformSelection 
                      adContent={adContent} 
                      onPlatformChange={handlePlatformChange}
                      platformRecommendations={currentPlatformRecommendations}
                    />
                  </TabsContent>
                  
                  <TabsContent value="sizes" className="space-y-4">
                    <SizeSelection 
                      adContent={adContent}
                      onInputChange={handleInputChange}
                      adSizesConfig={adSizesConfig}
                    />
                  </TabsContent>

                  <TabsContent value="advanced">
                    <h3 className="text-lg font-medium mb-4">{t("adDesigner.advancedOptions.title")}</h3>
                    <AdvancedOptions adContent={adContent} onUpdate={handleInputChange} />
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

          <ResizablePanel defaultSize={60} minSize={30}>
            <AdPreview 
              adContent={adContent}
              generatedAd={generatedAd}
              getAdSizeConfig={getAdSizeConfig}
              onDownload={handleDownload}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
        
        <AssetLibrarySelector 
          isOpen={isAssetLibraryOpen}
          setIsOpen={setIsAssetLibraryOpen}
          onSelectImage={handleSelectImage}
          selectedPlatform={adContent.platform}
        />
      </div>
    </Layout>
  );
};

export default AdDesigner;
