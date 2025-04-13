
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentRecommendation } from "../scheduler/types";
import { ArrowUpRight, Lightbulb, Sparkles, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// بيانات توضيحية
const recommendationsData: ContentRecommendation[] = [
  {
    id: 1,
    title: "زيادة محتوى الفيديو القصير",
    description: "إنشاء فيديوهات قصيرة (15-30 ثانية) تعرض منتجاتنا بطريقة إبداعية",
    category: "الشكل",
    priority: "high",
    implementationDifficulty: "medium",
    expectedImpact: 35
  },
  {
    id: 2,
    title: "استخدام المحتوى التفاعلي",
    description: "إضافة استطلاعات رأي وأسئلة واختبارات في المنشورات لزيادة التفاعل",
    category: "التفاعل",
    priority: "medium",
    implementationDifficulty: "easy",
    expectedImpact: 28
  },
  {
    id: 3,
    title: "تحسين أوقات النشر",
    description: "تعديل جدول النشر ليتناسب مع أوقات نشاط الجمهور المستهدف",
    category: "الاستراتيجية",
    priority: "high",
    implementationDifficulty: "easy",
    expectedImpact: 42
  },
  {
    id: 4,
    title: "توظيف مؤثرين مصغرين",
    description: "التعاون مع مؤثرين لديهم جمهور صغير ولكن متفاعل في مجالنا",
    category: "التسويق",
    priority: "medium",
    implementationDifficulty: "medium",
    expectedImpact: 31
  },
  {
    id: 5,
    title: "تطوير سلسلة محتوى أسبوعية",
    description: "إنشاء سلسلة محتوى ثابتة بموضوع محدد ينشر أسبوعياً لزيادة الانتظام",
    category: "المحتوى",
    priority: "low",
    implementationDifficulty: "medium",
    expectedImpact: 25
  },
  {
    id: 6,
    title: "استخدام المزيد من المحتوى المرئي",
    description: "زيادة نسبة الصور والرسوم البيانية في المنشورات لتحسين المشاهدة والفهم",
    category: "المحتوى",
    priority: "medium",
    implementationDifficulty: "easy",
    expectedImpact: 30
  },
];

const ContentRecommendations: React.FC = () => {
  
  // Get priority badge
  const getPriorityBadge = (priority: ContentRecommendation["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">أولوية عالية</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">أولوية متوسطة</Badge>;
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">أولوية منخفضة</Badge>;
      default:
        return <Badge>غير محدد</Badge>;
    }
  };
  
  // Get difficulty badge
  const getDifficultyBadge = (difficulty: ContentRecommendation["implementationDifficulty"]) => {
    switch (difficulty) {
      case "easy":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">سهل</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">متوسط</Badge>;
      case "hard":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">صعب</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };
  
  // Get impact color
  const getImpactColor = (impact: number): string => {
    if (impact >= 40) return "bg-green-500";
    if (impact >= 30) return "bg-emerald-500";
    if (impact >= 20) return "bg-blue-500";
    return "bg-slate-500";
  };
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "المحتوى": return <Sparkles className="h-4 w-4" />;
      case "التفاعل": return <ArrowUpRight className="h-4 w-4" />;
      case "الاستراتيجية": return <TrendingUp className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };
  
  // Filter recommendations by category
  const getRecommendationsByCategory = (category: string) => {
    if (category === "all") return recommendationsData;
    return recommendationsData.filter(rec => rec.category === category);
  };

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(recommendationsData.map(rec => rec.category)))];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-beauty-gold" />
          توصيات لتحسين المحتوى المستقبلي
        </CardTitle>
        <CardDescription>اقتراحات معتمدة على تحليل البيانات لتحسين أداء المحتوى</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="المحتوى">المحتوى</TabsTrigger>
            <TabsTrigger value="التفاعل">التفاعل</TabsTrigger>
            <TabsTrigger value="الاستراتيجية">الاستراتيجية</TabsTrigger>
            <TabsTrigger value="التسويق">التسويق</TabsTrigger>
            <TabsTrigger value="الشكل">الشكل</TabsTrigger>
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {getRecommendationsByCategory(category).map((recommendation) => (
                <div key={recommendation.id} className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1 rounded-full bg-beauty-pink/20">
                          {getCategoryIcon(recommendation.category)}
                        </div>
                        <span className="text-sm text-muted-foreground">{recommendation.category}</span>
                        {getPriorityBadge(recommendation.priority)}
                      </div>
                      <h3 className="font-semibold text-lg">{recommendation.title}</h3>
                      <p className="text-muted-foreground mt-1">{recommendation.description}</p>
                    </div>
                    <div className="flex flex-col items-end min-w-[130px]">
                      <div className="text-sm text-muted-foreground mb-1">التأثير المتوقع</div>
                      <div className="flex items-center gap-1">
                        <div className="text-xl font-bold">{recommendation.expectedImpact}%</div>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="text-sm">صعوبة التنفيذ:</div>
                    {getDifficultyBadge(recommendation.implementationDifficulty)}
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">نسبة التأثير</span>
                      <span className="text-sm font-medium">{recommendation.expectedImpact}%</span>
                    </div>
                    <Progress value={recommendation.expectedImpact} className="h-2" indicatorClassName={getImpactColor(recommendation.expectedImpact)} />
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentRecommendations;
