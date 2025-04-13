
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TemplateType } from "./types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Play, Zap, RotateCw, Move } from "lucide-react";
import { motion } from "framer-motion";

interface TemplateSuggestionsProps {
  selectedImage: string | null;
  videoGenerated: boolean;
  selectedTemplate: TemplateType;
  setSelectedTemplate: (template: TemplateType) => void;
}

const TemplateInfo: Record<TemplateType, { name: string; description: string; icon: React.ReactNode }> = {
  zoom: { 
    name: "تكبير", 
    description: "تأثير تكبير تدريجي للصورة",
    icon: <Zap className="text-white h-6 w-6" />
  },
  pan: { 
    name: "تحريك", 
    description: "تأثير حركة أفقية عبر الصورة",
    icon: <Move className="text-white h-6 w-6" />
  },
  rotate: { 
    name: "دوران", 
    description: "تأثير دوران بسيط للصورة",
    icon: <RotateCw className="text-white h-6 w-6" />
  }
};

const TemplateSuggestions: React.FC<TemplateSuggestionsProps> = ({
  selectedImage,
  videoGenerated,
  selectedTemplate,
  setSelectedTemplate,
}) => {
  if (!videoGenerated || !selectedImage) return null;
  
  return (
    <div className="mt-6">
      <h3 className="font-medium mb-3">قوالب مقترحة</h3>
      <div className="grid grid-cols-3 gap-3">
        {(["zoom", "pan", "rotate"] as TemplateType[]).map((template) => (
          <TooltipProvider key={template} delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
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
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex flex-col items-center gap-1">
                              {TemplateInfo[template].icon}
                              <Play className="text-white h-5 w-5" />
                            </div>
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
                </motion.div>
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
