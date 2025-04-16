
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, RefreshCcw, Languages, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface ContentDisplayProps {
  content: string | null;
  setContent: (content: string) => void;
  generating: boolean;
  copied: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  content,
  setContent,
  generating,
  copied,
  onCopy,
  onRegenerate,
}) => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const loaderVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 360, transition: { duration: 2, repeat: Infinity, ease: "linear" } }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {generating ? (
          <motion.div 
            key="loading"
            className="h-64 flex flex-col items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <motion.div 
              className="text-primary"
              variants={loaderVariants}
              initial="initial"
              animate="animate"
            >
              <Loader2 className="h-8 w-8 mb-4" />
            </motion.div>
            <motion.p 
              className="text-muted-foreground"
              variants={itemVariants}
            >
              {t("contentCreator.generating", "جاري إنشاء محتوى جذاب...")}
            </motion.p>
          </motion.div>
        ) : content ? (
          <motion.div 
            key="content"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <motion.div className="flex justify-end gap-2 mb-4" variants={itemVariants}>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onCopy}
                disabled={copied}
                className="group"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div 
                      key="copied"
                      className="flex items-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Check className="h-4 w-4 ml-1 text-green-500" />
                      {t("common.copied", "تم النسخ")}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="copy"
                      className="flex items-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Copy className="h-4 w-4 ml-1 group-hover:text-primary transition-colors" />
                      {t("common.copy", "نسخ")}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onRegenerate}
                disabled={generating}
                className="group"
              >
                <RefreshCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
              </Button>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[270px] font-medium text-lg resize-none"
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            className="h-64 flex flex-col items-center justify-center text-muted-foreground"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariants}
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Languages className="h-16 w-16 mb-4 text-muted-foreground/50" />
            </motion.div>
            <motion.p variants={itemVariants}>
              {t("contentCreator.emptyState", "قم بتهيئة الإعدادات وإنشاء محتوى تسويقي")}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentDisplay;
