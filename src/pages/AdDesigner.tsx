
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
import { Loader2, Download, Image as ImageIcon, Sparkles, Instagram, Facebook, Share2, LayoutTemplate, Settings, Library } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useToast } from "@/hooks/use-toast";
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
    textShadow: false
  });
  const [generatedAd, setGeneratedAd] = useState<string | null>(null);
  const [isAssetLibraryOpen, setIsAssetLibraryOpen] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setAdContent({ ...adContent, [field]: value });
  };

  const handleGenerate = () => {
    setLoading(true);
    
    // Simulate ad generation
    setTimeout(() => {
      // Use a selected image or a placeholder
      setGeneratedAd(adContent.imageUrl || "https://images.unsplash.com/photo-1596704017254-9b5e2a025acf?q=80&w=1080&auto=format&fit=crop");
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

  const handleApplyTemplate = (templateContent: typeof adContent) => {
    setAdContent({ ...adContent, ...templateContent });
  };

  const handleSelectImage = (imageUrl: string) => {
    setAdContent({ ...adContent, imageUrl });
    setGeneratedAd(imageUrl);
  };

  // Get aspect ratio based on selected ad size
  const getAspectRatio = () => {
    switch(adContent.adSize) {
      case "square": return "aspect-square"; // 1:1
      case "portrait": return "aspect-4/5"; // 4:5
      case "landscape": return "aspect-video"; // 16:9
      case "story": return "aspect-9/16"; // 9:16
      case "wide": return "aspect-2/1"; // 2:1
      default: return "aspect-square"; // Default to 1:1
    }
  };

  // Get text style based on settings
  const getTextStyle = () => {
    let style: React.CSSProperties = {
      fontFamily: getFontFamily(),
      fontSize: `${adContent.fontSize}%`
    };
    
    if (adContent.textShadow) {
      style.textShadow = "0 2px 4px rgba(0,0,0,0.3)";
    }
    
    return style;
  };
  
  // Get font family based on custom font setting
  const getFontFamily = () => {
    switch (adContent.customFont) {
      case "elegant": return "serif";
      case "bold": return "system-ui";
      case "playful": return "cursive";
      case "minimal": return "monospace";
      default: return "sans-serif";
    }
  };
  
  // Get background style based on effect settings
  const getBackgroundStyle = () => {
    if (!generatedAd) return {};
    
    let style: React.CSSProperties = {
      backgroundImage: `url(${generatedAd})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    };
    
    switch (adContent.effectStyle) {
      case "gradient":
        style.backgroundImage = `linear-gradient(to bottom, transparent, rgba(0,0,0,0.7)), url(${generatedAd})`;
        break;
      case "blur": 
        style.filter = "blur(3px)";
        break;
      case "overlay":
        style.boxShadow = `inset 0 0 0 2000px rgba(0, 0, 0, ${adContent.overlayOpacity / 100})`;
        break;
      case "duotone":
        // A simplified duotone effect
        style.filter = "grayscale(100%) sepia(20%) brightness(90%) hue-rotate(45deg)";
        break;
      default:
        break;
    }
    
    return style;
  };
  
  // Get content positioning based on brand position
  const getContentPosition = () => {
    switch (adContent.brandPosition) {
      case "top": return "justify-start";
      case "bottom": return "justify-end";
      case "center": return "justify-center";
      case "none": return "hidden";
      default: return "justify-end";
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{t("adDesigner.title")}</h1>
        <p className="text-muted-foreground mb-6">{t("adDesigner.description")}</p>

        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[600px]"
        >
          {/* Editor Panel */}
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
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="imagePrompt">{t("adDesigner.imagePrompt")}</Label>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsAssetLibraryOpen(true)}
                        >
                          <Library className="h-4 w-4 mr-2" />
                          {t("adDesigner.selectFromLibrary")}
                        </Button>
                      </div>
                      <Textarea 
                        id="imagePrompt" 
                        value={adContent.imagePrompt}
                        onChange={(e) => handleInputChange("imagePrompt", e.target.value)}
                        placeholder={t("adDesigner.imagePlaceholder")}
                        disabled={!!adContent.imageUrl}
                      />
                      {adContent.imageUrl && (
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-sm text-muted-foreground">{t("adDesigner.usingSelectedImage")}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleInputChange("imageUrl", "")}
                          >
                            {t("adDesigner.clearImage")}
                          </Button>
                        </div>
                      )}
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
                          <SelectItem value="shop_now">{t("adDesigner.cta.shop_now")}</SelectItem>
                          <SelectItem value="learn_more">{t("adDesigner.cta.learn_more")}</SelectItem>
                          <SelectItem value="sign_up">{t("adDesigner.cta.sign_up")}</SelectItem>
                          <SelectItem value="contact_us">{t("adDesigner.cta.contact_us")}</SelectItem>
                          <SelectItem value="book_now">{t("adDesigner.cta.book_now")}</SelectItem>
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

          {/* Preview Panel */}
          <ResizablePanel defaultSize={60} minSize={30}>
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

                <div className={`bg-gray-50 rounded-lg ${generatedAd ? '' : 'h-[400px]'} flex items-center justify-center border overflow-hidden`}>
                  {generatedAd ? (
                    <div className={`relative w-full ${getAspectRatio()}`}>
                      <div className="absolute inset-0" style={getBackgroundStyle()}></div>
                      
                      {/* Content overlay */}
                      <div className={`absolute inset-0 flex flex-col p-4 ${getContentPosition()}`}>
                        <div className={`${adContent.effectStyle === "overlay" ? "text-white" : ""}`} style={getTextStyle()}>
                          {adContent.headline && <h3 className="text-xl font-bold mb-1">{adContent.headline}</h3>}
                          {adContent.description && <p className="text-sm mb-2">{adContent.description}</p>}
                          <Button size="sm" style={{backgroundColor: adContent.color}}>
                            {t(`adDesigner.cta.${adContent.callToAction}`)}
                          </Button>
                        </div>
                      </div>
                      
                      {/* Logo if enabled */}
                      {adContent.showLogo && (
                        <div className="absolute top-2 left-2 bg-white/80 rounded-full p-1 w-8 h-8 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-gray-800"></div>
                        </div>
                      )}
                      
                      {/* Platform indicator */}
                      <div className="absolute bottom-2 right-2 text-xs px-2 py-1 bg-black/50 text-white rounded-full">
                        {adContent.platform}
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
        
        {/* Asset Library Selector Dialog */}
        <AssetLibrarySelector 
          isOpen={isAssetLibraryOpen}
          setIsOpen={setIsAssetLibraryOpen}
          onSelectImage={handleSelectImage}
        />
      </div>
    </Layout>
  );
};

export default AdDesigner;
