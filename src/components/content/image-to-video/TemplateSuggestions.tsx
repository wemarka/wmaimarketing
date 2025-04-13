
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface TemplateSuggestionsProps {
  selectedImage: string | null;
  videoGenerated: boolean;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
}

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
        {["zoom", "pan", "rotate"].map((template) => (
          <Card 
            key={template}
            className={`cursor-pointer overflow-hidden ${selectedTemplate === template ? "ring-2 ring-primary" : ""}`}
            onClick={() => setSelectedTemplate(template)}
          >
            <AspectRatio ratio={1 / 1}>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt={template}
                  className="w-full h-full object-cover"
                />
              )}
            </AspectRatio>
            <CardContent className="p-2">
              <p className="text-xs font-medium text-center">
                {template === "zoom" ? "تكبير" : 
                 template === "pan" ? "تحريك" : "دوران"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSuggestions;
