
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { ImagePlus, FileText, Clock, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgClass: string;
  count?: number;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  icon,
  bgClass,
  count
}) => (
  <Card className="overflow-hidden border border-border/30 shadow-sm hover:shadow-md transition-all">
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
);

const ContentTab = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("dashboard.content.title", "المحتوى")}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ContentCard 
          title={t("dashboard.content.media", "الوسائط")}
          description={t("dashboard.content.mediaDesc", "صور وفيديوهات")}
          icon={<ImagePlus className="text-blue-600 h-6 w-6" />}
          bgClass="bg-blue-50"
          count={156}
        />
        
        <ContentCard 
          title={t("dashboard.content.posts", "المنشورات")}
          description={t("dashboard.content.postsDesc", "المنشورات المنشورة")}
          icon={<FileText className="text-emerald-600 h-6 w-6" />}
          bgClass="bg-emerald-50"
          count={42}
        />
        
        <ContentCard 
          title={t("dashboard.content.scheduled", "مجدولة")}
          description={t("dashboard.content.scheduledDesc", "منشورات مجدولة")}
          icon={<Clock className="text-amber-600 h-6 w-6" />}
          bgClass="bg-amber-50"
          count={18}
        />
        
        <ContentCard 
          title={t("dashboard.content.comments", "التعليقات")}
          description={t("dashboard.content.commentsDesc", "تعليقات للمراجعة")}
          icon={<MessageCircle className="text-purple-600 h-6 w-6" />}
          bgClass="bg-purple-50"
          count={24}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.content.recent", "المحتوى الحديث")}</CardTitle>
          <CardDescription>
            {t("dashboard.content.recentDesc", "آخر المنشورات والمحتوى الذي تم إنشاؤه")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Content grid with placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="aspect-square rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer flex items-center justify-center transition-all"
              >
                <span className="text-xs text-muted-foreground">
                  {t("dashboard.content.contentPreview", "معاينة المحتوى")} {i + 1}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentTab;
