
import React from "react";
import Layout from "@/components/layout/Layout";
import { AdContentGenerator } from "@/modules/marketing/components";

const AdContentGeneratorPage = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-2">مولد المحتوى الإعلاني</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          إنشاء محتوى إعلاني جذاب لمنتجات التجميل باستخدام الذكاء الاصطناعي
        </p>
        
        <AdContentGenerator />
      </div>
    </Layout>
  );
};

export default AdContentGeneratorPage;
