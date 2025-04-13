
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TemplateType } from "./types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Play } from "lucide-react";

interface TemplateSuggestionsProps {
  selectedImage: string | null;
  videoGenerated: boolean;
  selectedTemplate: TemplateType;
  setSelectedTemplate: (template: TemplateType) => void;
}

const TemplateInfo: Record<TemplateType, { name: string; description: string }> = {
  zoom: { 
    name: "تكبير", 
    description: "تأثير تكبير تدريجي للصورة" 
  },
  pan: { 
    name: "تحريك", 
    description: "تأثير حركة أفقية عبر الصورة" 
  },
  rotate: { 
    name: "دوران", 
    description: "تأثير دوران بسيط للصورة" 
  }
};

const TemplateSuggestions: React.FC<TemplateSuggestionsProps> = ({
  selectedImage,
  videoGenerated,
  selectedTemplate,
  setSelectedTemplate,
}) => {
  if (!videoGenerated) return null;
  
  return (
    <div className="mt-6">
      <h3 className="font-medium mb-3">قوالب مقترحة</h3>
      <div className="grid grid-cols-3 gap-3">
        {(["zoom", "pan", "rotate"] as TemplateType[]).map((template) => (
          <TooltipProvider key={template} delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card 
                  className={`cursor-pointer overflow-hidden transition-all ${
                    selectedTemplate === template ? "ring-2 ring-primary shadow-md" : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <AspectRatio ratio={1 / 1} className="relative group">
                    {selectedImage && (
                      <>
                        <img
                          src={selectedImage}
                          alt={TemplateInfo[template].name}
                          className={`w-full h-full object-cover transition-transform ${
                            template === "zoom" ? "group-hover:scale-110" : 
                            template === "pan" ? "group-hover:translate-x-2" : 
                            "group-hover:rotate-3"
                          }`}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Play className="text-white h-8 w-8" />
                        </div>
                      </>
                    )}
                  </AspectRatio>
                  <CardContent className="p-2">
                    <p className="text-xs font-medium text-center">
                      {TemplateInfo[template].name}
                    </p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">{TemplateInfo[template].description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default TemplateSuggestions;
