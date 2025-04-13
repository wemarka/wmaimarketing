
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, ImageIcon } from "lucide-react";

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
  }
}

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template['content']) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);

  // Sample templates data
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
        imagePrompt: "Elegant skincare product with natural ingredients, minimalist aesthetic"
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
        imagePrompt: "Bold cosmetics promotion with discount tag, vibrant colors"
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
        imagePrompt: "Summer themed beauty products, bright and sunny aesthetic"
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
        imagePrompt: "Person with great skin showing testimonial, natural lighting"
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
        imagePrompt: "New beauty product launch with elegant packaging, studio lighting"
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
            </CardContent>
          </Card>
        ))}
      </div>
      
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

export default TemplateSelector;
