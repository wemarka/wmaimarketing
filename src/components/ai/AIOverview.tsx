
import React from "react";
import { Bot, Image, MessageSquare, Video, Zap } from "lucide-react";
import AICapabilityCard from "./AICapabilityCard";

const AIOverview: React.FC = () => {
  const capabilities = [
    {
      title: "تحسين المحتوى",
      description: "تحسين وتلخيص وترجمة النصوص التسويقية لمنتجات التجميل",
      icon: MessageSquare,
      color: "text-blue-500",
      badgeText: "شائع"
    },
    {
      title: "توليد الصور",
      description: "إنشاء صور احترافية لمنتجات التجميل باستخدام الذكاء الاصطناعي",
      icon: Image,
      color: "text-purple-500"
    },
    {
      title: "أفكار الفيديو",
      description: "إنشاء أفكار وسيناريوهات للمحتوى المرئي الترويجي",
      icon: Video,
      color: "text-red-500"
    },
    {
      title: "تحليل الأداء",
      description: "تحليل أداء المحتوى التسويقي وتقديم توصيات للتحسين",
      icon: Zap,
      color: "text-amber-500",
      badgeText: "قريباً"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 text-center">
        <div className="mx-auto bg-muted/50 p-3 rounded-full">
          <Bot className="h-8 w-8 text-beauty-gold" />
        </div>
        <h2 className="text-2xl font-bold">مرحباً بك في استوديو الذكاء الاصطناعي</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          استخدم قدرات الذكاء الاصطناعي لتسريع وتحسين إنشاء المحتوى التسويقي لمنتجات التجميل
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {capabilities.map((item) => (
          <AICapabilityCard
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
            color={item.color}
            badgeText={item.badgeText}
          />
        ))}
      </div>
    </div>
  );
};

export default AIOverview;
