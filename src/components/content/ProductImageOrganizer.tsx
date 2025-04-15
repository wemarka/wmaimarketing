
import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ImageGallery from "./ImageGallery";
import ImageColorAnalysis from "./ImageColorAnalysis";
import AssetsLibrary from "./assets-library/AssetsLibrary";
import AutoImageAnalyzer from "./AutoImageAnalyzer";

const ProductImageOrganizer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t("productImageOrganizer.title")}</h1>
        <p className="text-muted-foreground">
          {t("productImageOrganizer.subtitle")}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t("productImageOrganizer.cardTitle")}</CardTitle>
          <CardDescription>
            {t("productImageOrganizer.cardDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className={`mb-4 flex flex-wrap ${isRTL ? "space-x-reverse" : ""}`}>
              <TabsTrigger value="gallery">{t("productImageOrganizer.tabs.gallery")}</TabsTrigger>
              <TabsTrigger value="analysis">{t("productImageOrganizer.tabs.analysis")}</TabsTrigger>
              <TabsTrigger value="auto-analysis">{t("productImageOrganizer.tabs.autoAnalysis")}</TabsTrigger>
              <TabsTrigger value="library">{t("productImageOrganizer.tabs.library")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gallery">
              <ImageGallery />
            </TabsContent>
            
            <TabsContent value="analysis">
              <ImageColorAnalysis />
            </TabsContent>
            
            <TabsContent value="auto-analysis">
              <AutoImageAnalyzer />
            </TabsContent>
            
            <TabsContent value="library">
              <AssetsLibrary />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductImageOrganizer;
