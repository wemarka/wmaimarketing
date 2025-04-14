
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ThumbsUp, MessageCircle } from "lucide-react";

// Sample data
const contentData = [
  {
    id: 1,
    title: "مستحضر تجميل جديد للبشرة المختلطة",
    type: "post",
    platform: "Instagram",
    engagement: 820,
    comments: 48,
    publishedAt: "2025-04-12T14:30:00",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "كيف تختارين أحمر الشفاه المناسب لبشرتك",
    type: "reel",
    platform: "Instagram",
    engagement: 1250,
    comments: 72,
    publishedAt: "2025-04-10T10:15:00",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "روتين العناية بالبشرة الصباحي",
    type: "video",
    platform: "TikTok",
    engagement: 940,
    comments: 63,
    publishedAt: "2025-04-08T18:45:00",
    image: "/placeholder.svg"
  }
];

const ContentInsights = () => {
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'post': return t("dashboard.content.types.post");
      case 'reel': return t("dashboard.content.types.reel");
      case 'video': return t("dashboard.content.types.video");
      default: return type;
    }
  };

  const getPlatformBadgeClass = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'bg-pink-100 text-pink-600 hover:bg-pink-200';
      case 'Facebook': return 'bg-blue-100 text-blue-600 hover:bg-blue-200';
      case 'TikTok': return 'bg-slate-100 text-slate-600 hover:bg-slate-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{t("dashboard.content.title")}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {t("dashboard.content.subtitle")}
          </p>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {contentData.map((content) => (
            <div key={content.id} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
              <div className="h-16 w-16 rounded-md bg-muted overflow-hidden shrink-0">
                <img src={content.image} alt={content.title} className="h-full w-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-1">
                  <Badge variant="outline" className={getPlatformBadgeClass(content.platform)}>
                    {content.platform}
                  </Badge>
                  <Badge variant="outline">
                    {getContentTypeLabel(content.type)}
                  </Badge>
                </div>
                <h4 className="font-medium text-sm truncate">{content.title}</h4>
                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(content.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{content.engagement}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{content.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentInsights;
