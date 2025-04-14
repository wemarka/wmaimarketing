
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Sparkles, Image, Copy, Download, Loader2, RotateCcw, SaveAll } from "lucide-react";
import { generateImage, getRecentGenerations, GeneratedImage } from "../services/imageService";
import { enhanceImagePrompt, translatePromptIfNeeded, generateHashtags } from "../utils/promptHelper";

const GenerateAd = () => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<string>("realistic");
  const [size, setSize] = useState<string>("1:1");
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [recentGenerations, setRecentGenerations] = useState<GeneratedImage[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [descriptionText, setDescriptionText] = useState("");

  React.useEffect(() => {
    // Load recent generations on component mount
    loadRecentGenerations();
  }, []);

  const loadRecentGenerations = async () => {
    try {
      const generations = await getRecentGenerations();
      setRecentGenerations(generations);
    } catch (error) {
      console.error("Error loading recent generations:", error);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error(t("adGenerator.errors.emptyPrompt"));
      return;
    }

    setIsLoading(true);
    try {
      // Translate prompt if needed and enhance it
      const translatedPrompt = await translatePromptIfNeeded(prompt);
      const enhancedPrompt = await enhanceImagePrompt(translatedPrompt, {
        brand,
        product,
        style,
        audience
      });

      // Generate the image
      const result = await generateImage({
        prompt: enhancedPrompt,
        style: style as any,
        size: size as any,
        brand,
        product
      });

      setGeneratedImage(result);
      
      // Generate hashtags and description
      const tags = await generateHashtags(prompt, product ? 'product' : 'beauty');
      setHashtags(tags);
      
      // Generate description with OpenAI
      try {
        const descriptionResult = await enhanceImagePrompt(prompt, {
          brand,
          product,
          additionalContext: "Create a short marketing description"
        });
        setDescriptionText(descriptionResult);
      } catch (err) {
        setDescriptionText("");
      }
      
      toast.success(t("adGenerator.success.imageGenerated"));
      
      // Refresh recent generations
      loadRecentGenerations();
    } catch (error) {
      console.error("Error:", error);
      toast.error(t("adGenerator.errors.generationFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("common.copiedToClipboard"));
  };

  const downloadImage = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `generated-ad-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{t("adGenerator.title")}</h1>
            <p className="text-muted-foreground mt-1">{t("adGenerator.subtitle")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("adGenerator.inputSection.title")}</CardTitle>
                <CardDescription>
                  {t("adGenerator.inputSection.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="prompt">{t("adGenerator.inputSection.prompt")}</Label>
                  <Textarea
                    id="prompt"
                    placeholder={t("adGenerator.inputSection.promptPlaceholder")}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="brand">{t("adGenerator.inputSection.brand")}</Label>
                    <Input
                      id="brand"
                      placeholder={t("adGenerator.inputSection.brandPlaceholder")}
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="product">{t("adGenerator.inputSection.product")}</Label>
                    <Input
                      id="product"
                      placeholder={t("adGenerator.inputSection.productPlaceholder")}
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="style">{t("adGenerator.inputSection.style")}</Label>
                    <Select value={style} onValueChange={setStyle}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("adGenerator.inputSection.selectStyle")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realistic">{t("adGenerator.styles.realistic")}</SelectItem>
                        <SelectItem value="artistic">{t("adGenerator.styles.artistic")}</SelectItem>
                        <SelectItem value="cartoon">{t("adGenerator.styles.cartoon")}</SelectItem>
                        <SelectItem value="vibrant">{t("adGenerator.styles.vibrant")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="size">{t("adGenerator.inputSection.size")}</Label>
                    <Select value={size} onValueChange={setSize}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("adGenerator.inputSection.selectSize")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1:1">{t("adGenerator.sizes.square")}</SelectItem>
                        <SelectItem value="16:9">{t("adGenerator.sizes.landscape")}</SelectItem>
                        <SelectItem value="4:5">{t("adGenerator.sizes.portrait")}</SelectItem>
                        <SelectItem value="3:2">{t("adGenerator.sizes.standard")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="audience">{t("adGenerator.inputSection.audience")}</Label>
                  <Input
                    id="audience"
                    placeholder={t("adGenerator.inputSection.audiencePlaceholder")}
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handleGenerate}
                  disabled={isLoading || !prompt.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("common.generating")}
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      {t("adGenerator.generateButton")}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{t("adGenerator.previewSection.title")}</CardTitle>
                <CardDescription>{t("adGenerator.previewSection.description")}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {generatedImage ? (
                  <div className="space-y-4 h-full">
                    <div className="aspect-square relative rounded-lg overflow-hidden border">
                      <img
                        src={generatedImage.imageUrl}
                        alt="Generated advertisement"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadImage(generatedImage.imageUrl)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        {t("common.download")}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setGeneratedImage(null)}>
                        <RotateCcw className="h-4 w-4 mr-1" />
                        {t("common.reset")}
                      </Button>
                      <Button variant="outline" size="sm">
                        <SaveAll className="h-4 w-4 mr-1" />
                        {t("common.save")}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center border rounded-lg border-dashed text-muted-foreground p-8">
                    <div className="text-center">
                      <Image className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>{t("adGenerator.previewSection.noImageYet")}</p>
                      <p className="text-sm">{t("adGenerator.previewSection.fillFormAndGenerate")}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {generatedImage && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t("adGenerator.resultsSection.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="description">
                <TabsList>
                  <TabsTrigger value="description">{t("adGenerator.resultsSection.tabs.description")}</TabsTrigger>
                  <TabsTrigger value="hashtags">{t("adGenerator.resultsSection.tabs.hashtags")}</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="py-4">
                  <div className="space-y-4">
                    <Textarea
                      value={descriptionText}
                      onChange={(e) => setDescriptionText(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <Button variant="secondary" size="sm" onClick={() => copyToClipboard(descriptionText)}>
                      <Copy className="h-4 w-4 mr-1" />
                      {t("common.copyText")}
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="hashtags" className="py-4">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {hashtags.length > 0 ? (
                        hashtags.map((tag, index) => (
                          <div
                            key={index}
                            className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                          >
                            #{tag}
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">{t("adGenerator.resultsSection.noHashtags")}</p>
                      )}
                    </div>
                    {hashtags.length > 0 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => copyToClipboard(hashtags.map(tag => `#${tag}`).join(" "))}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        {t("common.copyHashtags")}
                      </Button>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t("adGenerator.recentSection.title")}</CardTitle>
            <CardDescription>{t("adGenerator.recentSection.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {recentGenerations.length > 0 ? (
                recentGenerations.map((item, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-md overflow-hidden border cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setGeneratedImage(item)}
                  >
                    <img
                      src={item.imageUrl}
                      alt={`Recent generation ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  <p>{t("adGenerator.recentSection.noGenerations")}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default GenerateAd;
