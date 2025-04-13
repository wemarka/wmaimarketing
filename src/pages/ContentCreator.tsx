
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, 
  Copy, 
  Check, 
  RefreshCcw, 
  Languages,
  MessageSquarePlus,
  Instagram,
  Facebook,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContentCreator = () => {
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);
  const [platform, setPlatform] = useState("instagram");
  const [language, setLanguage] = useState("both");
  const [tone, setTone] = useState("professional");
  const [content, setContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      const sampleContent = {
        instagram: {
          english: "✨ Unveil your perfect pout with our NEW Ruby Sunrise Lipstick! 💋 This hydrating formula glides on for all-day color that doesn't fade or feather. Infused with nourishing oils for softness you can feel. #BeautyEssentials #PerfectPout #NewLipstick",
          arabic: "✨ اكتشفي شفاهًا مثالية مع أحمر الشفاه روبي صنرايز الجديد! 💋 تركيبة مرطبة تنزلق بسلاسة للحصول على لون يدوم طوال اليوم دون أن يتلاشى. مع زيوت مغذية لنعومة ملموسة. #مستحضرات_التجميل #شفاه_مثالية #أحمر_شفاه_جديد"
        },
        facebook: {
          english: "Introducing our NEW Ruby Sunrise Lipstick! 💄\n\nThis summer's must-have shade is here to elevate your makeup game. Our advanced formula combines vibrant color with nourishing ingredients for lips that look and feel amazing all day long.\n\nEnjoy 15% off with code RUBYLOVE this week only! Shop now via link in bio.",
          arabic: "نقدم لكِ أحمر الشفاه روبي صنرايز الجديد! 💄\n\nلون الصيف الذي لا غنى عنه موجود هنا لرفع مستوى مكياجك. تجمع تركيبتنا المتطورة بين اللون النابض بالحياة والمكونات المغذية للشفاه التي تبدو رائعة طوال اليوم.\n\nاستمتعي بخصم 15% مع رمز RUBYLOVE هذا الأسبوع فقط! تسوقي الآن عبر الرابط في البايو."
        },
        tiktok: {
          english: "This lipstick changed my life 😱💄 #BeautyHacks #MakeupTrends #LipstickObsessed #NewBeautyFind #MustHaveMakeup #BeautyReview",
          arabic: "أحمر الشفاه هذا غيّر حياتي 😱💄 #خدع_الجمال #اتجاهات_المكياج #هوس_أحمر_الشفاه #اكتشاف_جمال_جديد #مكياج_ضروري #تقييم_منتجات_التجميل"
        }
      };
      
      if (language === "english") {
        setContent(sampleContent[platform as keyof typeof sampleContent].english);
      } else if (language === "arabic") {
        setContent(sampleContent[platform as keyof typeof sampleContent].arabic);
      } else {
        setContent(`${sampleContent[platform as keyof typeof sampleContent].english}\n\n${sampleContent[platform as keyof typeof sampleContent].arabic}`);
      }
      
      setGenerating(false);
      
      toast({
        title: "Content Generated",
        description: "Your marketing content is ready to use!",
      });
    }, 2000);
  };

  const handleCopy = () => {
    if (!content) return;
    
    navigator.clipboard.writeText(content);
    setCopied(true);
    
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = {
    instagram: {
      icon: <Instagram className="h-4 w-4" />,
      label: "Instagram",
    },
    facebook: {
      icon: <Facebook className="h-4 w-4" />,
      label: "Facebook", 
    },
    tiktok: {
      icon: <MessageSquare className="h-4 w-4" />,
      label: "TikTok", 
    },
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-2">AI Content Creator</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Generate engaging marketing content for your beauty products. Our AI creates 
          captions, hashtags, and marketing messages tailored to each platform.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-6">Content Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Platform</label>
                  <Tabs
                    defaultValue="instagram"
                    value={platform}
                    onValueChange={setPlatform}
                    className="w-full"
                  >
                    <TabsList className="w-full">
                      {Object.entries(platforms).map(([key, { icon, label }]) => (
                        <TabsTrigger key={key} value={key} className="flex-1">
                          <div className="flex items-center gap-1">
                            {icon}
                            <span className="hidden sm:inline">{label}</span>
                          </div>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                      <SelectItem value="both">English & Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tone</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly & Casual</SelectItem>
                      <SelectItem value="luxury">Luxury & Elegant</SelectItem>
                      <SelectItem value="trendy">Trendy & Bold</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <MessageSquarePlus className="h-4 w-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">Generated Content</h2>
                {content && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCopy}
                      disabled={copied}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleGenerate}
                      disabled={generating}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              {generating ? (
                <div className="h-64 flex flex-col items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin mb-4 text-beauty-purple" />
                  <p className="text-muted-foreground">Crafting engaging content...</p>
                </div>
              ) : content ? (
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[270px] font-medium"
                />
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                  <Languages className="h-16 w-16 mb-4 text-muted-foreground/50" />
                  <p>Configure your settings and generate marketing content</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ContentCreator;
