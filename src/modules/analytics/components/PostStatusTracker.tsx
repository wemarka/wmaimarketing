
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, CheckCircle, AlertCircle, XCircle, 
  LoaderCircle, BarChart2, Search, Filter, RefreshCw 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// تعريف أنواع الحالات للمنشورات
type PostStatus = "published" | "scheduled" | "pending" | "rejected";

// نوع بيانات المنشور
interface PostData {
  id: string;
  title: string;
  status: PostStatus;
  date: string;
  priority?: "high" | "medium" | "low";
  platform?: string;
}

const PostStatusTracker = () => {
  const [viewType, setViewType] = useState<"cards" | "chart">("cards");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [platformFilter, setplatformFilter] = useState<string>("all");
  const { toast } = useToast();

  // بيانات توضيحية للحالات
  const statuses = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />,
      label: "تم نشر 12 منشوراً",
      description: "تم النشر خلال آخر 7 أيام",
      bgClass: "bg-green-50 dark:bg-green-900/20",
      borderClass: "border-green-200 dark:border-green-900",
      count: 12
    },
    {
      icon: <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />,
      label: "8 منشورات مجدولة",
      description: "سيتم نشرها خلال الأسبوع القادم",
      bgClass: "bg-yellow-50 dark:bg-yellow-900/20",
      borderClass: "border-yellow-200 dark:border-yellow-900",
      count: 8
    },
    {
      icon: <LoaderCircle className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
      label: "5 منشورات في انتظار المراجعة",
      description: "بانتظار الاعتماد النهائي",
      bgClass: "bg-blue-50 dark:bg-blue-900/20",
      borderClass: "border-blue-200 dark:border-blue-900",
      count: 5
    },
    {
      icon: <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />,
      label: "2 منشورات مرفوضة",
      description: "تم رفضها بواسطة المراجع",
      bgClass: "bg-red-50 dark:bg-red-900/20",
      borderClass: "border-red-200 dark:border-red-900",
      count: 2
    }
  ];

  // بيانات للمنشورات - ستكون من قاعدة البيانات في التطبيق الحقيقي
  const postsData: PostData[] = [
    { id: "1", title: "أهم صيحات مكياج الصيف", status: "published", date: "2025-04-10", platform: "instagram" },
    { id: "2", title: "كيفية اختيار أحمر الشفاه المناسب", status: "published", date: "2025-04-08", priority: "high", platform: "facebook" },
    { id: "3", title: "نصائح للعناية بالبشرة", status: "scheduled", date: "2025-04-18", platform: "tiktok" },
    { id: "4", title: "مستحضرات أساسية في حقيبة المكياج", status: "scheduled", date: "2025-04-20", priority: "medium", platform: "facebook" },
    { id: "5", title: "أحدث منتجات العناية بالشعر", status: "pending", date: "2025-04-15", platform: "instagram" },
    { id: "6", title: "طرق تطبيق كريم الأساس للبشرة الجافة", status: "rejected", date: "2025-04-05", platform: "tiktok" },
    { id: "7", title: "منتجات طبيعية للعناية بالبشرة", status: "published", date: "2025-04-12", priority: "low", platform: "instagram" },
    { id: "8", title: "أفضل أنواع العطور النسائية", status: "pending", date: "2025-04-17", platform: "facebook" }
  ];

  // حساب مجموع المنشورات
  const totalPosts = statuses.reduce((sum, status) => sum + status.count, 0);

  // تصفية البيانات حسب البحث والفلتر
  const filteredPosts = postsData.filter((post) => {
    const matchesSearch = post.title.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    const matchesPlatform = platformFilter === "all" || post.platform === platformFilter;
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  // إعادة تحميل البيانات (محاكاة)
  const handleRefresh = () => {
    setIsLoading(true);
    
    // محاكاة طلب شبكة
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم تحديث البيانات",
        description: "تم تحديث حالة المنشورات بنجاح",
      });
    }, 1500);
  };

  // حساب النسب المئوية للرسم البياني
  const getPercentage = (count: number) => {
    return (count / totalPosts) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2">
            حالة المنشورات
            {isLoading && (
              <RefreshCw size={16} className="animate-spin text-muted-foreground" />
            )}
          </CardTitle>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button 
              variant="outline" 
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewType(viewType === "cards" ? "chart" : "cards")}
              title={viewType === "cards" ? "عرض المخطط البياني" : "عرض البطاقات"}
            >
              <BarChart2 className="h-4 w-4" />
              <span className="sr-only">تبديل العرض</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex gap-1 items-center"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw size={14} /> تحديث
            </Button>
            <Button variant="ghost" size="sm">عرض الكل</Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* حقل البحث وخيارات التصفية */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 rtl:right-2.5 rtl:left-auto top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="بحث عن منشور..." 
                className="pl-8 rtl:pl-4 rtl:pr-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter size={14} />
                  <span className="hidden sm:inline">تصفية</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setplatformFilter("all")}>
                  جميع المنصات
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setplatformFilter("instagram")}>
                  Instagram
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setplatformFilter("facebook")}>
                  Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setplatformFilter("tiktok")}>
                  TikTok
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setStatusFilter}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="published">المنشورة</TabsTrigger>
              <TabsTrigger value="scheduled">المجدولة</TabsTrigger>
              <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
            </TabsList>
            
            <AnimatePresence mode="wait">
              <TabsContent value="all" className="outline-none">
                {viewType === "cards" ? (
                  <>
                    {filteredPosts.length > 0 ? (
                      <div className="space-y-4">
                        {filteredPosts.map((post, index) => (
                          <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                            className={cn(
                              "flex justify-between items-center p-3 rounded-md border transition-colors",
                              getStatusStyle(post.status).bg,
                              getStatusStyle(post.status).border
                            )}
                          >
                            <div className="flex items-center gap-3">
                              {getStatusIcon(post.status)}
                              <div>
                                <div className="flex gap-2 items-center">
                                  <p className="font-medium">{post.title}</p>
                                  {post.priority && (
                                    <Badge variant={getPriorityVariant(post.priority)} className="text-xs">
                                      {getPriorityText(post.priority)}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex gap-2 items-center text-sm text-muted-foreground">
                                  <span>{getFormattedDate(post.date)}</span>
                                  {post.platform && (
                                    <Badge variant="outline" className="text-xs">
                                      {post.platform}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">التفاصيل</Button>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-muted-foreground">لا توجد منشورات تطابق معايير البحث</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    {/* مخطط بياني دائري سريع الاستجابة */}
                    <div className="relative pt-2">
                      <div className="h-40 w-40 mx-auto">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          {statuses.map((status, index) => {
                            // حساب قيم المخطط الدائري
                            const percentage = getPercentage(status.count);
                            const dashArray = 2 * Math.PI * 25; // محيط الدائرة (2πr)
                            const dashOffset = dashArray - (dashArray * percentage) / 100;
                            const prevPercentages = statuses
                              .slice(0, index)
                              .reduce((sum, s) => sum + getPercentage(s.count), 0);
                            
                            // تعيين الألوان حسب حالة المنشور
                            let strokeColor = "";
                            if (index === 0) strokeColor = "stroke-green-500"; // منشورة
                            if (index === 1) strokeColor = "stroke-yellow-500"; // مجدولة
                            if (index === 2) strokeColor = "stroke-blue-500"; // قيد الانتظار
                            if (index === 3) strokeColor = "stroke-red-500"; // مرفوضة
                            
                            return (
                              <circle
                                key={index}
                                cx="50"
                                cy="50"
                                r="25"
                                fill="none"
                                strokeWidth="12"
                                strokeDasharray={dashArray}
                                strokeDashoffset={dashOffset}
                                style={{
                                  transformOrigin: "50% 50%",
                                  transform: `rotate(${prevPercentages * 3.6}deg)`,
                                }}
                                className={cn("transition-all", strokeColor)}
                              />
                            );
                          })}
                          <circle cx="50" cy="50" r="18" className="fill-card" />
                          <text
                            x="50"
                            y="50"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            className="fill-foreground text-lg font-bold"
                          >
                            {totalPosts}
                          </text>
                          <text
                            x="50"
                            y="60"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            className="fill-muted-foreground text-[9px]"
                          >
                            منشور
                          </text>
                        </svg>
                      </div>
                      
                      <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {statuses.map((status, index) => {
                          let dotColor = "";
                          if (index === 0) dotColor = "bg-green-500";
                          if (index === 1) dotColor = "bg-yellow-500";
                          if (index === 2) dotColor = "bg-blue-500";
                          if (index === 3) dotColor = "bg-red-500";
                          
                          return (
                            <div key={index} className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${dotColor}`} />
                              <div className="text-sm">
                                <span className="font-medium">{status.count}</span>
                                <span className="text-muted-foreground mr-1">
                                  ({Math.round(getPercentage(status.count))}%)
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* جدول بيانات المنشورات */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {statuses.map((status, index) => (
                        <div 
                          key={index} 
                          className={cn(
                            "p-3 rounded-md border text-center transition-colors", 
                            status.bgClass,
                            status.borderClass
                          )}
                        >
                          <div className="flex justify-center mb-2">{status.icon}</div>
                          <p className="text-2xl font-bold">{status.count}</p>
                          <p className="text-xs text-muted-foreground">{status.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="published">
                <AnimatedTabContent status="published" posts={filteredPosts} />
              </TabsContent>
              
              <TabsContent value="scheduled">
                <AnimatedTabContent status="scheduled" posts={filteredPosts} />
              </TabsContent>
              
              <TabsContent value="pending">
                <AnimatedTabContent status="pending" posts={filteredPosts} />
              </TabsContent>
              
              <TabsContent value="rejected">
                <AnimatedTabContent status="rejected" posts={filteredPosts} />
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// مكون فرعي لعرض محتوى التبويبات مع رسوم متحركة
const AnimatedTabContent = ({ status, posts }: { status: string, posts: PostData[] }) => {
  const filteredPosts = posts.filter(post => post.status === status);
  
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "published": return "المنشورات المنشورة";
      case "scheduled": return "المنشورات المجدولة";
      case "pending": return "المنشورات قيد الانتظار";
      case "rejected": return "المنشورات المرفوضة";
      default: return "المنشورات";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published": return <CheckCircle className="h-10 w-10 mx-auto mb-4 text-green-500 opacity-50" />;
      case "scheduled": return <Clock className="h-10 w-10 mx-auto mb-4 text-yellow-500 opacity-50" />;
      case "pending": return <LoaderCircle className="h-10 w-10 mx-auto mb-4 text-blue-500 opacity-50" />;
      case "rejected": return <XCircle className="h-10 w-10 mx-auto mb-4 text-red-500 opacity-50" />;
      default: return null;
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className={cn(
                "flex justify-between items-center p-3 rounded-md border transition-colors",
                getStatusStyle(post.status).bg,
                getStatusStyle(post.status).border
              )}
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(post.status)}
                <div>
                  <div className="flex gap-2 items-center">
                    <p className="font-medium">{post.title}</p>
                    {post.priority && (
                      <Badge variant={getPriorityVariant(post.priority)} className="text-xs">
                        {getPriorityText(post.priority)}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2 items-center text-sm text-muted-foreground">
                    <span>{getFormattedDate(post.date)}</span>
                    {post.platform && (
                      <Badge variant="outline" className="text-xs">
                        {post.platform}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">التفاصيل</Button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          {getStatusIcon(status)}
          <h3 className="font-medium text-xl">{getStatusLabel(status)}</h3>
          <p className="text-muted-foreground mt-2">لا توجد منشورات تطابق معايير البحث</p>
        </div>
      )}
    </motion.div>
  );
};

// وظائف مساعدة للحصول على الأيقونات والأنماط حسب الحالة
const getStatusIcon = (status: PostStatus) => {
  switch (status) {
    case "published":
      return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />;
    case "scheduled":
      return <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />;
    case "pending":
      return <LoaderCircle className="h-5 w-5 text-blue-600 dark:text-blue-500" />;
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />;
  }
};

const getStatusStyle = (status: PostStatus) => {
  switch (status) {
    case "published":
      return {
        bg: "bg-green-50 dark:bg-green-900/20",
        border: "border-green-200 dark:border-green-900"
      };
    case "scheduled":
      return {
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        border: "border-yellow-200 dark:border-yellow-900"
      };
    case "pending":
      return {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-900"
      };
    case "rejected":
      return {
        bg: "bg-red-50 dark:bg-red-900/20",
        border: "border-red-200 dark:border-red-900"
      };
  }
};

// وظائف مساعدة للتحويل بين الأولويات
const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case "high": return "destructive";
    case "medium": return "secondary";
    case "low": return "outline";
    default: return "secondary";
  }
};

const getPriorityText = (priority: string) => {
  switch (priority) {
    case "high": return "أولوية عالية";
    case "medium": return "أولوية متوسطة";
    case "low": return "أولوية منخفضة";
    default: return "";
  }
};

// تنسيق التاريخ بشكل أفضل
const getFormattedDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('ar-EG', options);
};

export default PostStatusTracker;
