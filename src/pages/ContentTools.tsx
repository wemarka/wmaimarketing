
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ProductImageOrganizer from "@/components/content/ProductImageOrganizer";
import MarketingTextGenerator from "@/components/content/MarketingTextGenerator";
import CompanyTerminology from "@/components/content/CompanyTerminology";
import ImageToVideoConverter from "@/components/content/ImageToVideoConverter";

const ContentTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState("image-organizer");
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">أدوات إنتاج المحتوى المتقدمة</h1>
          <p className="text-muted-foreground">
            أدوات متقدمة لإدارة وإنشاء المحتوى التسويقي للعلامات التجارية
          </p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <Tabs 
              defaultValue="image-organizer" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger value="image-organizer">منظم الصور</TabsTrigger>
                <TabsTrigger value="marketing-text">إنشاء نصوص تسويقية</TabsTrigger>
                <TabsTrigger value="terminology">قاموس المصطلحات</TabsTrigger>
                <TabsTrigger value="image-to-video">تحويل الصور لفيديو</TabsTrigger>
              </TabsList>
              
              <TabsContent value="image-organizer">
                <ProductImageOrganizer />
              </TabsContent>
              
              <TabsContent value="marketing-text">
                <MarketingTextGenerator />
              </TabsContent>
              
              <TabsContent value="terminology">
                <CompanyTerminology />
              </TabsContent>
              
              <TabsContent value="image-to-video">
                <ImageToVideoConverter />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ContentTools;
