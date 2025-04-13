
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
        <h1 className="text-2xl font-bold mb-2">نظام إدارة صور المنتجات</h1>
        <p className="text-muted-foreground">
          تنظيم وتصنيف وتحليل صور منتجات العناية بالبشرة والمكياج
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>أدوات إنتاج المحتوى البصري</CardTitle>
          <CardDescription>
            تنظيم وتحليل وإدارة الصور والأصول البصرية للشركة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="mb-4 flex flex-wrap">
              <TabsTrigger value="gallery">معرض الصور</TabsTrigger>
              <TabsTrigger value="analysis">تحليل الألوان</TabsTrigger>
              <TabsTrigger value="auto-analysis">التحليل التلقائي</TabsTrigger>
              <TabsTrigger value="library">مكتبة الأصول</TabsTrigger>
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
