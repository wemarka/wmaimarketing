
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Video, Share2 } from "lucide-react";
import { TemplateType, VideoSettingsType } from "./types";
import { motion } from "framer-motion";

interface VideoPreviewProps {
  selectedImage: string | null;
  videoGenerated: boolean;
  selectedTemplate: TemplateType;
  videoSettings: VideoSettingsType;
  duration: number[];
}

// Animation variants for text effects
const textVariants = {
  typing: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  },
  fade: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1
    }
  },
  bounce: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

const charVariants = {
  typing: {
    opacity: [0, 1],
    transition: { duration: 0.2 }
  }
};

const VideoPreview: React.FC<VideoPreviewProps> = ({
  selectedImage,
  videoGenerated,
  selectedTemplate,
  videoSettings,
  duration,
}) => {
  const getTextPosition = () => {
    switch (videoSettings.textPosition) {
      case "top": return "top-0 pt-4";
      case "center": return "top-1/2 transform -translate-y-1/2";
      case "bottom": 
      default: return "bottom-0 pb-4";
    }
  };

  // Render text with animation effect if specified
  const renderText = (text: string) => {
    if (!text) return null;
    
    if (videoSettings.textEffect === "typing") {
      return (
        <motion.div initial={{ opacity: 0 }} animate="typing" variants={textVariants}>
          {text.split('').map((char, index) => (
            <motion.span key={index} variants={charVariants}>
              {char}
            </motion.span>
          ))}
        </motion.div>
      );
    } else if (videoSettings.textEffect === "fade") {
      return (
        <motion.div initial={{ opacity: 0 }} animate="fade" variants={textVariants}>
          {text}
        </motion.div>
      );
    } else if (videoSettings.textEffect === "bounce") {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {text}
        </motion.div>
      );
    }
    
    return text;
  };
  
  return (
    <Card className="overflow-hidden shadow-lg">
      <AspectRatio ratio={9 / 16}>
        {videoGenerated && selectedImage ? (
          <div className="relative bg-black w-full h-full">
            <motion.img
              src={selectedImage}
              alt="Video preview"
              className={`w-full h-full object-cover`}
              animate={
                selectedTemplate === "zoom" ? { scale: [1, 1.1] } : 
                selectedTemplate === "pan" ? { x: [0, -20] } :
                { rotate: [0, 5, 0, -5, 0] }
              }
              transition={
                selectedTemplate === "zoom" ? { duration: duration[0], repeat: Infinity, repeatType: "reverse" } : 
                selectedTemplate === "pan" ? { duration: duration[0], repeat: Infinity, repeatType: "reverse" } :
                { duration: duration[0], repeat: Infinity, repeatType: "loop", ease: "linear" }
              }
            />
            
            <div 
              className="absolute inset-0" 
              style={{
                background: videoSettings.backgroundColor || 'transparent',
                boxShadow: `inset 0 0 0 2000px rgba(0, 0, 0, ${videoSettings.overlayOpacity ? videoSettings.overlayOpacity / 100 : 0.5})`
              }}
            ></div>
            
            <div 
              className={`absolute inset-x-0 p-4 text-white ${getTextPosition()}`}
              style={{ color: videoSettings.textColor || '#ffffff' }}
            >
              {videoSettings.title && (
                <h3 className="text-xl font-bold mb-1">
                  {renderText(videoSettings.title)}
                </h3>
              )}
              
              {videoSettings.subtitle && (
                <p className="mb-4 text-sm opacity-90">
                  {renderText(videoSettings.subtitle)}
                </p>
              )}
              
              {videoSettings.cta && (
                <motion.div 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 1 }}
                  className="inline-block bg-beauty-pink text-white px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  {videoSettings.cta}
                </motion.div>
              )}
            </div>
            
            {videoSettings.watermark !== false && (
              <div className="absolute top-4 right-4">
                <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-beauty-purple"></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-muted w-full h-full">
            <Video className="h-12 w-12 mb-2 text-muted-foreground" />
            <p className="text-muted-foreground text-center max-w-xs">
              {selectedImage 
                ? "انقر على زر إنشاء الفيديو لمعاينة النتيجة" 
                : "يرجى رفع صورة أولاً"}
            </p>
          </div>
        )}
      </AspectRatio>
      <CardContent className="p-4">
        {videoGenerated && (
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{videoSettings.title || "فيديو المنتج"}</p>
              <p className="text-xs text-muted-foreground">{duration[0]} ثوانٍ • قالب {selectedTemplate}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                مشاركة
              </Button>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                تحميل
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoPreview;
