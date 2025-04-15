
import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Palette, Library, Scan } from "lucide-react";
import ImageGallery from "./ImageGallery";
import ImageColorAnalysis from "./ImageColorAnalysis";
import AssetsLibrary from "./assets-library/AssetsLibrary";
import AutoImageAnalyzer from "./AutoImageAnalyzer";
import { motion } from "framer-motion";

const ProductImageOrganizer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  const tabItems = [
    {
      id: "gallery",
      label: t("productImageOrganizer.tabs.gallery"),
      icon: <Image className="h-4 w-4" />
    },
    {
      id: "analysis",
      label: t("productImageOrganizer.tabs.analysis"),
      icon: <Palette className="h-4 w-4" />
    },
    {
      id: "auto-analysis",
      label: t("productImageOrganizer.tabs.autoAnalysis"),
      icon: <Scan className="h-4 w-4" />
    },
    {
      id: "library",
      label: t("productImageOrganizer.tabs.library"),
      icon: <Library className="h-4 w-4" />
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div className="mb-6" variants={itemVariants}>
        <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-beauty-purple to-beauty-lightpurple bg-clip-text text-transparent">
          {t("productImageOrganizer.title")}
        </h1>
        <p className="text-muted-foreground">
          {t("productImageOrganizer.subtitle")}
        </p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="border-beauty-purple/20 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b border-beauty-purple/10">
            <CardTitle>{t("productImageOrganizer.cardTitle")}</CardTitle>
            <CardDescription>
              {t("productImageOrganizer.cardDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="gallery" className="w-full">
              <TabsList className={`mb-4 bg-background border border-muted rounded-lg p-1 ${isRTL ? "space-x-reverse" : ""}`}>
                {tabItems.map((tab) => (
                  <TabsTrigger 
                    key={tab.id}
                    value={tab.id} 
                    className="rounded-md data-[state=active]:bg-beauty-purple/10 data-[state=active]:text-beauty-purple"
                  >
                    <div className="flex items-center gap-1.5">
                      {tab.icon}
                      <span>{tab.label}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="gallery" className="animate-fade-in">
                <ImageGallery />
              </TabsContent>
              
              <TabsContent value="analysis" className="animate-fade-in">
                <ImageColorAnalysis />
              </TabsContent>
              
              <TabsContent value="auto-analysis" className="animate-fade-in">
                <AutoImageAnalyzer />
              </TabsContent>
              
              <TabsContent value="library" className="animate-fade-in">
                <AssetsLibrary />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProductImageOrganizer;
