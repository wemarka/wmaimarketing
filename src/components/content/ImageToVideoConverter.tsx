
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUploader from "./image-to-video/ImageUploader";
import VideoSettings from "./image-to-video/VideoSettings";
import VideoPreview from "./image-to-video/VideoPreview";
import TemplateSuggestions from "./image-to-video/TemplateSuggestions";
import VideoTextEffects from "./image-to-video/VideoTextEffects";
import VideoThemes from "./image-to-video/VideoThemes";
import { VideoSettingsType, TemplateType, TextEffectType, TextPositionType } from "./image-to-video/types";

const ImageToVideoConverter: React.FC = () => {
  const { t } = useTranslation();
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [videoGenerating, setVideoGenerating] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [duration, setDuration] = useState([5]);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("zoom");
  const [activeTab, setActiveTab] = useState("basic");
  
  const [videoSettings, setVideoSettings] = useState<VideoSettingsType>({
    title: "",
    subtitle: "",
    cta: "اطلبيه الآن",
    textPosition: "bottom",
    textColor: "#ffffff",
    overlayOpacity: 50,
    textEffect: "none",
    watermark: true
  });
  
  const handleInputChange = (field: string, value: string | boolean | TextEffectType | TextPositionType | number) => {
    setVideoSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">تحويل الصورة إلى فيديو</h2>
        <p className="text-muted-foreground mb-4">
          تحويل صور المنتجات إلى فيديوهات قصيرة مع تأثيرات حركة وعناصر مميزة
        </p>
      </div>
    
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ImageUploader 
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            videoGenerated={videoGenerated}
            setVideoGenerated={setVideoGenerated}
          />
          
          {selectedImage && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">إعدادات أساسية</TabsTrigger>
                <TabsTrigger value="effects">تأثيرات النص</TabsTrigger>
                <TabsTrigger value="themes">سمات الفيديو</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <VideoSettings 
                  selectedImage={selectedImage}
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                  duration={duration}
                  setDuration={setDuration}
                  videoSettings={videoSettings}
                  handleInputChange={handleInputChange}
                  videoGenerating={videoGenerating}
                  setVideoGenerating={setVideoGenerating}
                  setVideoGenerated={setVideoGenerated}
                />
              </TabsContent>
              
              <TabsContent value="effects" className="space-y-4">
                <VideoTextEffects
                  videoSettings={videoSettings}
                  handleInputChange={handleInputChange}
                />
              </TabsContent>
              
              <TabsContent value="themes" className="space-y-4">
                <VideoThemes
                  videoSettings={videoSettings}
                  handleInputChange={handleInputChange}
                />
              </TabsContent>
            </Tabs>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-xl font-bold mb-4">معاينة الفيديو</h2>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTemplate + (videoGenerated ? "generated" : "preview")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VideoPreview 
                selectedImage={selectedImage}
                videoGenerated={videoGenerated}
                selectedTemplate={selectedTemplate}
                videoSettings={videoSettings}
                duration={duration}
              />
            </motion.div>
          </AnimatePresence>
          
          <TemplateSuggestions 
            selectedImage={selectedImage}
            videoGenerated={videoGenerated}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ImageToVideoConverter;
