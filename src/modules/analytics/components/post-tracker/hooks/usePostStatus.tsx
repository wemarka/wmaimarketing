
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PostData, StatusInfo } from "../types";
import { CheckCircle, Clock, LoaderCircle, XCircle } from "lucide-react";

export const usePostStatus = () => {
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

  const toggleViewType = () => {
    setViewType(viewType === "cards" ? "chart" : "cards");
  };

  return {
    viewType,
    isLoading,
    searchQuery,
    statusFilter,
    platformFilter,
    statuses,
    postsData,
    totalPosts,
    filteredPosts,
    setSearchQuery,
    setStatusFilter,
    setPlatformFilter,
    handleRefresh,
    toggleViewType
  };
};

