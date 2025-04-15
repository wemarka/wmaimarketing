
import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ImageGallery from "./ImageGallery";
import ImageColorAnalysis from "./ImageColorAnalysis";
import AssetsLibrary from "./assets-library/AssetsLibrary";
import AutoImageAnalyzer from "./AutoImageAnalyzer";

const ProductImageOrganizer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t("productImageOrganizer.title", "Product Image Management System")}</h1>
        <p className="text-muted-foreground">
          {t("productImageOrganizer.subtitle", "Organize, categorize, and analyze skincare and makeup product images")}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t("productImageOrganizer.cardTitle", "Visual Content Production Tools")}</CardTitle>
          <CardDescription>
            {t("productImageOrganizer.cardDescription", "Organize, analyze, and manage company images and visual assets")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="mb-4 flex flex-wrap">
              <TabsTrigger value="gallery">{t("productImageOrganizer.tabs.gallery", "Image Gallery")}</TabsTrigger>
              <TabsTrigger value="analysis">{t("productImageOrganizer.tabs.analysis", "Color Analysis")}</TabsTrigger>
              <TabsTrigger value="auto-analysis">{t("productImageOrganizer.tabs.autoAnalysis", "Auto Analysis")}</TabsTrigger>
              <TabsTrigger value="library">{t("productImageOrganizer.tabs.library", "Assets Library")}</TabsTrigger>
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
