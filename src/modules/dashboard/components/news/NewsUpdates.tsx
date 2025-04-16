
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  badgeVariant: "default" | "secondary" | "destructive" | "outline";
}

const NewsUpdates = () => {
  const { t } = useTranslation();
  
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "تحديث جديد لسياسات الإعلان على انستجرام",
      date: "منذ 2 ساعة",
      category: "تحديثات",
      badgeVariant: "default"
    },
    {
      id: 2,
      title: "تيك توك يطلق أدوات جديدة للتسويق",
      date: "منذ 5 ساعات",
      category: "أدوات",
      badgeVariant: "secondary"
    },
    {
      id: 3,
      title: "تحديثات في خوارزميات فيسبوك",
      date: "منذ يوم",
      category: "هام",
      badgeVariant: "destructive"
    },
    {
      id: 4,
      title: "نصائح للتعامل مع التحديثات الجديدة",
      date: "منذ يومين",
      category: "نصائح",
      badgeVariant: "outline"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  return (
    <Card className="h-full border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{t("dashboard.news.title", "آخر الأخبار")}</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {newsItems.map((item) => (
            <motion.div 
              key={item.id} 
              className="border-b border-border/40 last:border-0 pb-3 last:pb-0"
              variants={itemVariants}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-medium">{item.title}</h3>
                <Badge variant={item.badgeVariant} className="text-[10px]">{item.category}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-4 pt-2 border-t border-border/30">
          <button className="text-xs text-primary hover:text-primary/80 transition-colors w-full text-center">
            {t("dashboard.news.viewMore", "عرض المزيد من التحديثات")}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsUpdates;
