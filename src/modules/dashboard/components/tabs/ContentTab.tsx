
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { ImagePlus, FileText, Clock, MessageCircle, CheckCircle, Folder, Paintbrush, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ContentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgClass: string;
  count?: number;
  delay?: number;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  icon,
  bgClass,
  count,
  delay = 0
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <Card className="overflow-hidden border border-border/30 shadow-sm hover:shadow-md transition-all h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", bgClass)}>
            {icon}
          </div>
          {count !== undefined && (
            <div className="text-2xl font-bold">{count}</div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg mb-1">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const ContentTab = () => {
  const { t } = useTranslation();
  
  // Animation for staggered items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
            <FileText className="h-5 w-5 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold">{t("dashboard.content.title", "المحتوى")}</h2>
        </div>

        <div className="flex gap-2">
          <motion.button 
            className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ImagePlus className="h-3.5 w-3.5" />
            محتوى جديد
          </motion.button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ContentCard 
          title={t("dashboard.content.media", "الوسائط")}
          description={t("dashboard.content.mediaDesc", "صور وفيديوهات")}
          icon={<ImagePlus className="text-blue-600 h-6 w-6" />}
          bgClass="bg-blue-50"
          count={156}
          delay={0.1}
        />
        
        <ContentCard 
          title={t("dashboard.content.posts", "المنشورات")}
          description={t("dashboard.content.postsDesc", "المنشورات المنشورة")}
          icon={<FileText className="text-emerald-600 h-6 w-6" />}
          bgClass="bg-emerald-50"
          count={42}
          delay={0.2}
        />
        
        <ContentCard 
          title={t("dashboard.content.scheduled", "مجدولة")}
          description={t("dashboard.content.scheduledDesc", "منشورات مجدولة")}
          icon={<Clock className="text-amber-600 h-6 w-6" />}
          bgClass="bg-amber-50"
          count={18}
          delay={0.3}
        />
        
        <ContentCard 
          title={t("dashboard.content.comments", "التعليقات")}
          description={t("dashboard.content.commentsDesc", "تعليقات للمراجعة")}
          icon={<MessageCircle className="text-purple-600 h-6 w-6" />}
          bgClass="bg-purple-50"
          count={24}
          delay={0.4}
        />
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{t("dashboard.content.recent", "المحتوى الحديث")}</CardTitle>
              <CardDescription>
                {t("dashboard.content.recentDesc", "آخر المنشورات والمحتوى الذي تم إنشاؤه")}
              </CardDescription>
            </div>
            
            <div className="flex gap-2">
              <motion.button
                className="bg-muted/50 p-1.5 rounded text-muted-foreground"
                whileHover={{ scale: 1.05, backgroundColor: "rgb(var(--muted))" }}
              >
                <Folder className="h-4 w-4" />
              </motion.button>
              <motion.button
                className="bg-muted/50 p-1.5 rounded text-muted-foreground"
                whileHover={{ scale: 1.05, backgroundColor: "rgb(var(--muted))" }}
              >
                <ImageIcon className="h-4 w-4" />
              </motion.button>
              <motion.button
                className="bg-muted/50 p-1.5 rounded text-muted-foreground"
                whileHover={{ scale: 1.05, backgroundColor: "rgb(var(--muted))" }}
              >
                <Paintbrush className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Content grid with better visualization */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div 
                key={i} 
                variants={item}
                className="aspect-square rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer flex flex-col items-center justify-center transition-all overflow-hidden relative group"
              >
                {i % 2 === 0 ? (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-amber-50 to-rose-50 w-full h-full flex items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                )}
                
                <motion.div 
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  initial={false}
                >
                  <span className="text-xs text-white font-medium">
                    {t("dashboard.content.contentPreview", "معاينة المحتوى")} {i + 1}
                  </span>
                </motion.div>
                
                {i % 3 === 0 && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentTab;
