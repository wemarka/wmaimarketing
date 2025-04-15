
import React from "react";
import Layout from "@/components/layout/Layout";
import { AdContentGenerator } from "@/modules/marketing/components";
import { motion } from "framer-motion";

const AdContentGeneratorPage = () => {
  return (
    <Layout>
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="mb-2"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
        >
          مولد المحتوى الإعلاني
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground mb-8 max-w-2xl"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          إنشاء محتوى إعلاني جذاب لمنتجات التجميل باستخدام الذكاء الاصطناعي
        </motion.p>
        
        <AdContentGenerator />
      </motion.div>
    </Layout>
  );
};

export default AdContentGeneratorPage;
