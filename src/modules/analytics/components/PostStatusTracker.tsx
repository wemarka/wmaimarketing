
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, CheckCircle, AlertCircle, XCircle, 
  LoaderCircle, BarChart2, RefreshCw 
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence } from "framer-motion";

// استيراد المكونات الفرعية والأنواع
import { PostData, StatusInfo } from "./post-tracker/types";
import SearchFilters from "./post-tracker/SearchFilters";
import StatusChart from "./post-tracker/StatusChart";
import AnimatedTabContent from "./post-tracker/AnimatedTabContent";
import PostItem from "./post-tracker/PostItem";

const PostStatusTracker = () => {
  const [viewType, setViewType] = useState<"cards" | "chart">("cards");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const { toast } = useToast();

  // بيانات توضيحية للحالات
  const statuses: StatusInfo[] = [
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
          {/* استخدام مكون البحث والتصفية */}
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onPlatformFilterChange={setPlatformFilter}
          />
          
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
                          <PostItem key={post.id} post={post} index={index} />
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-muted-foreground">لا توجد منشورات تطابق معايير البحث</p>
                      </div>
                    )}
                  </>
                ) : (
                  <StatusChart statuses={statuses} totalPosts={totalPosts} />
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

export default PostStatusTracker;
