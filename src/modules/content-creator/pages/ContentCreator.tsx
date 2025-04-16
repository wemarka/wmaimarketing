
import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import { useContentCreator } from "../hooks/useContentCreator";
import ContentForm from "../components/ContentForm";
import ContentDisplay from "../components/ContentDisplay";
import { AnimatedCard } from "@/components/ui/animated-card";
import { motion } from "framer-motion";
import { FileText, Languages } from "lucide-react";
import SectionTitle from "@/components/dashboard/SectionTitle";

const ContentCreator = () => {
  const { t } = useTranslation();
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <Layout>
      <motion.div 
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <SectionTitle
          title={t("contentCreator.title", "منشئ المحتوى بالذكاء الاصطناعي")}
          subtitle={t("contentCreator.subtitle", "إنشاء محتوى تسويقي جذاب لمنتجات التجميل الخاصة بك. يقوم الذكاء الاصطناعي بإنشاء نصوص، هاشتاغات، ورسائل تسويقية مخصصة لكل منصة.")}
          icon={<FileText className="h-5 w-5" />}
          variant="gradient"
          size="lg"
          animated={true}
        />
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <AnimatedCard
            title={t("contentCreator.formTitle", "إعدادات المحتوى")}
            icon={<Languages className="h-5 w-5" />}
            variant="primary"
          >
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
          </AnimatedCard>
          
          <AnimatedCard
            title={t("contentCreator.displayTitle", "المحتوى المنشأ")}
            icon={<FileText className="h-5 w-5" />}
            variant="outline"
            motionProps={{ transition: { delay: 0.1 } }}
          >
            <ContentDisplay
              content={content}
              setContent={setContent}
              generating={generating}
              copied={copied}
              onCopy={handleCopy}
              onRegenerate={handleGenerate}
            />
          </AnimatedCard>
        </div>
      </motion.div>
    </Layout>
  );
};

export default ContentCreator;
