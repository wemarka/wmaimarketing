
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ImageUploader from "./image-to-video/ImageUploader";
import VideoSettings from "./image-to-video/VideoSettings";
import VideoPreview from "./image-to-video/VideoPreview";
import TemplateSuggestions from "./image-to-video/TemplateSuggestions";
import { VideoSettingsType } from "./image-to-video/types";

const ImageToVideoConverter: React.FC = () => {
  const { t } = useTranslation();
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [videoGenerating, setVideoGenerating] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [duration, setDuration] = useState([5]);
  const [selectedTemplate, setSelectedTemplate] = useState("zoom");
  
  const [videoSettings, setVideoSettings] = useState<VideoSettingsType>({
    title: "",
    subtitle: "",
    cta: "اطلبيه الآن",
  });
  
  const handleInputChange = (field: string, value: string) => {
    setVideoSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">تحويل الصورة إلى فيديو</h2>
          <p className="text-muted-foreground mb-4">
            تحويل صور المنتجات إلى فيديوهات قصيرة مع تأثيرات حركة وعناصر مميزة
          </p>
          
          <ImageUploader 
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            videoGenerated={videoGenerated}
            setVideoGenerated={setVideoGenerated}
          />
        </div>
        
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
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">معاينة الفيديو</h2>
        
        <VideoPreview 
          selectedImage={selectedImage}
          videoGenerated={videoGenerated}
          selectedTemplate={selectedTemplate}
          videoSettings={videoSettings}
          duration={duration}
        />
        
        <TemplateSuggestions 
          selectedImage={selectedImage}
          videoGenerated={videoGenerated}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      </div>
    </div>
  );
};

export default ImageToVideoConverter;
