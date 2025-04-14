
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { useContentCreator } from "../hooks/useContentCreator";
import ContentForm from "../components/ContentForm";
import ContentDisplay from "../components/ContentDisplay";

const ContentCreator = () => {
  const {
    generating,
    platform,
    setPlatform,
    language,
    setLanguage,
    tone,
    setTone,
    content,
    setContent,
    copied,
    product,
    setProduct,
    handleGenerate,
    handleCopy,
  } = useContentCreator();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-2">منشئ المحتوى بالذكاء الاصطناعي</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          إنشاء محتوى تسويقي جذاب لمنتجات التجميل الخاصة بك. يقوم الذكاء الاصطناعي بإنشاء
          نصوص، هاشتاغات، ورسائل تسويقية مخصصة لكل منصة.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-6">إعدادات المحتوى</h2>
              
              <ContentForm
                platform={platform}
                setPlatform={setPlatform}
                language={language}
                setLanguage={setLanguage}
                tone={tone}
                setTone={setTone}
                product={product}
                setProduct={setProduct}
                generating={generating}
                onGenerate={handleGenerate}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <ContentDisplay
                content={content}
                setContent={setContent}
                generating={generating}
                copied={copied}
                onCopy={handleCopy}
                onRegenerate={handleGenerate}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ContentCreator;
