
import React from "react";
import { Bot, Image, MessageSquare, Video, Zap } from "lucide-react";
import AICapabilityCard from "./AICapabilityCard";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const AIOverview: React.FC = () => {
  const { t } = useTranslation();
  
  const capabilities = [
    {
      title: t("aiStudio.capabilities.contentEnhancement.title"),
      description: t("aiStudio.capabilities.contentEnhancement.description"),
      icon: MessageSquare,
      color: "text-blue-500",
      badgeText: t("aiStudio.common.popular")
    },
    {
      title: t("aiStudio.capabilities.imageGeneration.title"),
      description: t("aiStudio.capabilities.imageGeneration.description"),
      icon: Image,
      color: "text-purple-500"
    },
    {
      title: t("aiStudio.capabilities.videoIdeas.title"),
      description: t("aiStudio.capabilities.videoIdeas.description"),
      icon: Video,
      color: "text-red-500"
    },
    {
      title: t("aiStudio.capabilities.performanceAnalysis.title"),
      description: t("aiStudio.capabilities.performanceAnalysis.description"),
      icon: Zap,
      color: "text-amber-500",
      badgeText: t("aiStudio.common.comingSoon")
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
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
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col gap-2 text-center"
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
          className="text-2xl font-bold"
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
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {capabilities.map((capability, index) => (
          <motion.div key={index} variants={item}>
            <AICapabilityCard
              title={capability.title}
              description={capability.description}
              icon={capability.icon}
              color={capability.color}
              badgeText={capability.badgeText}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AIOverview;
