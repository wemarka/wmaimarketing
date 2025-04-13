
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, ImageIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  content: {
    headline: string;
    description: string;
    callToAction: string;
    style: string;
    color: string;
    platform: string;
    imagePrompt: string;
    adSize?: string;
    effectStyle?: string;
    fontSize?: number;
    overlayOpacity?: number;
    showLogo?: boolean;
    brandPosition?: string;
    customFont?: string;
    textShadow?: boolean;
  }
}

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template['content']) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);

  // Enhanced templates data with more advanced options
  const templates: Template[] = [
    {
      id: "product",
      name: t("adDesigner.templates.product"),
      thumbnail: "https://images.unsplash.com/photo-1596704017254-9b5e2a025acf?w=300&auto=format",
      content: {
        headline: "Discover Our Premium Skincare",
        description: "Luxurious formula with natural ingredients for radiant, youthful skin",
        callToAction: "shop_now",
        style: "elegant",
        color: "#9b87f5",
        platform: "instagram",
        imagePrompt: "Elegant skincare product with natural ingredients, minimalist aesthetic",
        adSize: "square",
        effectStyle: "none",
        fontSize: 100,
        overlayOpacity: 0,
        showLogo: true,
        brandPosition: "bottom"
      }
    },
    {
      id: "promotion",
      name: t("adDesigner.templates.promotion"),
      thumbnail: "https://images.unsplash.com/photo-1631730358656-9c246e65d0c7?w=300&auto=format",
      content: {
        headline: "Limited Time Offer: 25% OFF",
        description: "Get our award-winning beauty collection at a special price this week only!",
        callToAction: "shop_now",
        style: "bold",
        color: "#ef4444",
        platform: "facebook",
        imagePrompt: "Bold cosmetics promotion with discount tag, vibrant colors",
        adSize: "landscape",
        effectStyle: "gradient",
        fontSize: 120,
        overlayOpacity: 20,
        showLogo: true,
        brandPosition: "bottom",
        textShadow: true,
        customFont: "bold"
      }
    },
    {
      id: "seasonal",
      name: t("adDesigner.templates.seasonal"),
      thumbnail: "https://images.unsplash.com/photo-1599733589046-75ed6419a6fa?w=300&auto=format",
      content: {
        headline: "Summer Beauty Essentials",
        description: "Stay glowing and protected all summer long with our seasonal collection",
        callToAction: "learn_more",
        style: "modern",
        color: "#f59e0b",
        platform: "instagram",
        imagePrompt: "Summer themed beauty products, bright and sunny aesthetic",
        adSize: "portrait",
        effectStyle: "overlay",
        fontSize: 110,
        overlayOpacity: 30,
        showLogo: true,
        brandPosition: "top",
        customFont: "playful"
      }
    },
    {
      id: "testimonial",
      name: t("adDesigner.templates.testimonial"),
      thumbnail: "https://images.unsplash.com/photo-1614093302611-8efc4de12407?w=300&auto=format",
      content: {
        headline: "\"This changed my skincare routine forever\"",
        description: "Join thousands of satisfied customers who've transformed their skin with our products",
        callToAction: "learn_more",
        style: "minimal",
        color: "#10b981",
        platform: "facebook",
        imagePrompt: "Person with great skin showing testimonial, natural lighting",
        adSize: "square",
        effectStyle: "blur",
        fontSize: 90,
        overlayOpacity: 40,
        showLogo: false,
        brandPosition: "bottom",
        customFont: "elegant"
      }
    },
    {
      id: "newArrival",
      name: t("adDesigner.templates.newArrival"),
      thumbnail: "https://images.unsplash.com/photo-1599733589046-75ed6419a6fa?w=300&auto=format",
      content: {
        headline: "Introducing: The New Collection",
        description: "Be the first to experience our latest innovation in beauty technology",
        callToAction: "sign_up",
        style: "modern",
        color: "#3b82f6",
        platform: "pinterest",
        imagePrompt: "New beauty product launch with elegant packaging, studio lighting",
        adSize: "portrait",
        effectStyle: "none",
        fontSize: 105,
        overlayOpacity: 0,
        showLogo: true,
        brandPosition: "bottom"
      }
    },
    {
      id: "storyAd",
      name: t("adDesigner.templates.storyAd"),
      thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&auto=format",
      content: {
        headline: "Swipe Up for Beauty",
        description: "Discover the secrets to perfect skin in our new guide",
        callToAction: "sign_up",
        style: "modern",
        color: "#ec4899",
        platform: "instagram",
        imagePrompt: "Vertical beauty product image perfect for Instagram story",
        adSize: "story",
        effectStyle: "gradient",
        fontSize: 110,
        overlayOpacity: 25,
        showLogo: true,
        brandPosition: "bottom",
        textShadow: true,
        customFont: "bold"
      }
    },
    {
      id: "cleanMinimal",
      name: t("adDesigner.templates.cleanMinimal"),
      thumbnail: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&auto=format",
      content: {
        headline: "Pure Beauty. Simply.",
        description: "Clean ingredients for a clean complexion",
        callToAction: "shop_now",
        style: "minimal",
        color: "#94a3b8",
        platform: "pinterest",
        imagePrompt: "Minimalist white beauty product on clean background",
        adSize: "square",
        effectStyle: "none",
        fontSize: 90,
        overlayOpacity: 0,
        showLogo: false,
        brandPosition: "none",
        customFont: "minimal"
      }
    },
    {
      id: "tutorial",
      name: t("adDesigner.templates.tutorial"),
      thumbnail: "https://images.unsplash.com/photo-1620784216706-89ad12a492cc?w=300&auto=format",
      content: {
        headline: "3 Steps to Perfect Skin",
        description: "Learn how to use our products for maximum results in just minutes a day",
        callToAction: "learn_more",
        style: "modern",
        color: "#8b5cf6",
        platform: "facebook",
        imagePrompt: "Step by step skincare routine demonstration with product",
        adSize: "landscape",
        effectStyle: "none",
        fontSize: 100,
        overlayOpacity: 0,
        showLogo: true,
        brandPosition: "bottom"
      }
    }
  ];

  const handleApplyTemplate = () => {
    if (!selectedTemplate) return;
    
    const template = templates.find(t => t.id === selectedTemplate);
    if (template) {
      onSelectTemplate(template.content);
      
      toast({
        title: t("adDesigner.templates.templateApplied"),
        description: t("adDesigner.templates.templateAppliedDescription"),
      });
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">{t("adDesigner.templates.description")}</p>
      
      <ScrollArea className="h-[400px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pr-4">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardContent className="p-3">
                <div className="relative">
                  {template.thumbnail ? (
                    <img 
                      src={template.thumbnail} 
                      alt={template.name} 
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                  ) : (
                    <div className="w-full h-32 bg-muted flex items-center justify-center rounded-md mb-2">
                      <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
                    </div>
                  )}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <p className="font-medium text-center">{template.name}</p>
                <div className="mt-2 flex justify-around">
                  <Badge platform={template.content.platform} />
                  <Badge size={template.content.adSize} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      <Button 
        className="w-full" 
        disabled={!selectedTemplate}
        onClick={handleApplyTemplate}
      >
        {t("adDesigner.templates.applyTemplate")}
      </Button>
    </div>
  );
};

// Helper components
const Badge = ({ platform, size }: { platform?: string; size?: string }) => {
  const { t } = useTranslation();
  
  if (platform) {
    return (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
        {platform}
      </span>
    );
  }
  
  if (size) {
    let label = "";
    switch (size) {
      case "square": label = "1:1"; break;
      case "portrait": label = "4:5"; break;
      case "landscape": label = "16:9"; break;
      case "story": label = "9:16"; break;
      case "wide": label = "2:1"; break;
      default: label = size;
    }
    
    return (
      <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700">
        {label}
      </span>
    );
  }
  
  return null;
};

export default TemplateSelector;
