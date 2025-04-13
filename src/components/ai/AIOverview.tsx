
import React, { useState } from "react";
import { Bot, Image, MessageSquare, Video, Zap, ArrowRight } from "lucide-react";
import AICapabilityCard from "./AICapabilityCard";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AIOverview: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  const capabilities = [
    {
      title: t("aiStudio.capabilities.contentEnhancement.title"),
      description: t("aiStudio.capabilities.contentEnhancement.description"),
      icon: MessageSquare,
      color: "text-blue-500",
      badgeText: t("aiStudio.common.popular"),
      tabValue: "content"
    },
    {
      title: t("aiStudio.capabilities.imageGeneration.title"),
      description: t("aiStudio.capabilities.imageGeneration.description"),
      icon: Image,
      color: "text-purple-500",
      tabValue: "images"
    },
    {
      title: t("aiStudio.capabilities.videoIdeas.title"),
      description: t("aiStudio.capabilities.videoIdeas.description"),
      icon: Video,
      color: "text-red-500",
      tabValue: "video"
    },
    {
      title: t("aiStudio.capabilities.performanceAnalysis.title"),
      description: t("aiStudio.capabilities.performanceAnalysis.description"),
      icon: Zap,
      color: "text-amber-500",
      badgeText: t("aiStudio.common.comingSoon"),
      tabValue: "analyzer"
    }
  ];

  const handleCardClick = (index: number) => {
    if (capabilities[index].badgeText === t("aiStudio.common.comingSoon")) {
      return;
    }
    setActiveCard(index);
    setTimeout(() => {
      navigate(`/ai-studio?tab=${capabilities[index].tabValue}`);
    }, 300);
  };

  const exploreAllTools = () => {
    const firstAvailableTab = capabilities.find(
      cap => cap.badgeText !== t("aiStudio.common.comingSoon")
    )?.tabValue || "content";
    
    navigate(`/ai-studio?tab=${firstAvailableTab}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="space-y-8">
      <motion.div 
        className="flex flex-col gap-4 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="mx-auto bg-muted/50 p-3 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            delay: 0.2 
          }}
        >
          <Bot className="h-8 w-8 text-beauty-gold" />
        </motion.div>
        <motion.h2 
          className="text-2xl md:text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {t("aiStudio.overview.welcome")}
        </motion.h2>
        <motion.p 
          className="text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {t("aiStudio.overview.subtitle")}
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {capabilities.map((capability, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            animate={activeCard === index ? { scale: 0.95, opacity: 0.8 } : {}}
          >
            <AICapabilityCard
              title={capability.title}
              description={capability.description}
              icon={capability.icon}
              color={capability.color}
              badgeText={capability.badgeText}
              onClick={() => handleCardClick(index)}
            >
              {!capability.badgeText?.includes(t("aiStudio.common.comingSoon")) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-2 text-sm group"
                >
                  <span>{t("aiStudio.common.tryNow")}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              )}
            </AICapabilityCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="flex justify-center mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <Button 
          onClick={exploreAllTools}
          variant="outline" 
          size="lg" 
          className="group border-beauty-purple/30 hover:border-beauty-purple/60 bg-beauty-purple/5"
        >
          {t("aiStudio.overview.exploreAll")}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  );
};

export default AIOverview;
