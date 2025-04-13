
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, ImageIcon, MessageSquare, Video, RotateCw } from "lucide-react";
import ContentEnhancer from "@/components/ai/ContentEnhancer";
import ImageGenerator from "@/components/ai/ImageGenerator";

const AIStudio = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-beauty-gold" />
            استوديو الذكاء الاصطناعي
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            استفد من قوة الذكاء الاصطناعي لتحسين محتواك وإنشاء صور جذابة وتعزيز جهود التسويق الخاصة بك
          </p>
        </div>

        <Tabs defaultValue="content" className="space-y-8">
          <TabsList>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              تحسين المحتوى
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              إنشاء الصور
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              تحسين الفيديوهات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <ContentEnhancer />
          </TabsContent>
          
          <TabsContent value="images">
            <ImageGenerator />
          </TabsContent>
          
          <TabsContent value="videos">
            <div className="border rounded-md p-8 text-center">
              <RotateCw className="h-10 w-10 text-muted-foreground mb-4 mx-auto animate-spin animate-once" />
              <h3 className="text-lg font-medium mb-2">قريبًا</h3>
              <p className="text-muted-foreground">
                ميزة تحسين الفيديوهات بالذكاء الاصطناعي قيد التطوير وستكون متاحة قريبًا
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AIStudio;
