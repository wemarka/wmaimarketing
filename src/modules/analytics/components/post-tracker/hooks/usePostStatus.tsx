
import React, { useState, useCallback, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { PostData, StatusInfo } from "../types";
import { CheckCircle, Clock, LoaderCircle, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const usePostStatus = () => {
  const [viewType, setViewType] = useState<"cards" | "chart">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const { toast } = useToast();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  // تحسين أداء بيانات الحالات باستخدام useMemo
  const statuses: StatusInfo[] = useMemo(() => [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />,
      label: "تم نشر 12 منشوراً",
      description: "تم النشر خلال آخر 7 أيام",
      bgClass: "bg-green-50 dark:bg-green-900/20",
      borderClass: "border-green-200 dark:border-green-900",
      count: 12,
      id: "published",
      value: 12
    },
    {
      icon: <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />,
      label: "8 منشورات مجدولة",
      description: "سيتم نشرها خلال الأسبوع القادم",
      bgClass: "bg-yellow-50 dark:bg-yellow-900/20",
      borderClass: "border-yellow-200 dark:border-yellow-900",
      count: 8,
      id: "scheduled",
      value: 8
    },
    {
      icon: <LoaderCircle className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
      label: "5 منشورات في انتظار المراجعة",
      description: "بانتظار الاعتماد النهائي",
      bgClass: "bg-blue-50 dark:bg-blue-900/20",
      borderClass: "border-blue-200 dark:border-blue-900",
      count: 5,
      id: "pending",
      value: 5
    },
    {
      icon: <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />,
      label: "2 منشورات مرفوضة",
      description: "تم رفضها بواسطة المراجع",
      bgClass: "bg-red-50 dark:bg-red-900/20",
      borderClass: "border-red-200 dark:border-red-900",
      count: 2,
      id: "rejected",
      value: 2
    }
  ], []);

  // استخدام React Query مع تحسين التخزين المؤقت
  const { data: postsData = [], isLoading } = useQuery({
    queryKey: ["post-status", searchQuery, statusFilter, platformFilter, dateFilter],
    queryFn: async (): Promise<PostData[]> => {
      // محاكاة تأخير الشبكة للمظهر الواقعي
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return [
        { id: "1", title: "أهم صيحات مكياج الصيف", status: "published", date: "2025-04-10", platform: "instagram" },
        { id: "2", title: "كيفية اختيار أحمر الشفاه المناسب", status: "published", date: "2025-04-08", priority: "high", platform: "facebook" },
        { id: "3", title: "نصائح للعناية بالبشرة", status: "scheduled", date: "2025-04-18", platform: "tiktok" },
        { id: "4", title: "مستحضرات أساسية في حقيبة المكياج", status: "scheduled", date: "2025-04-20", priority: "medium", platform: "facebook" },
        { id: "5", title: "أحدث منتجات العناية بالشعر", status: "pending", date: "2025-04-15", platform: "instagram" },
        { id: "6", title: "طرق تطبيق كريم الأساس للبشرة الجافة", status: "rejected", date: "2025-04-05", platform: "tiktok" },
        { id: "7", title: "منتجات طبيعية للعناية بالبشرة", status: "published", date: "2025-04-12", priority: "low", platform: "instagram" },
        { id: "8", title: "أفضل أنواع العطور النسائية", status: "pending", date: "2025-04-17", platform: "facebook" },
        { id: "9", title: "أحدث قصات الشعر لموسم الصيف", status: "scheduled", date: "2025-04-25", platform: "instagram", priority: "high" },
        { id: "10", title: "مقارنة بين منتجات العناية بالبشرة", status: "rejected", date: "2025-04-03", platform: "facebook" }
      ];
    },
    staleTime: 5 * 60 * 1000, // 5 دقائق
    gcTime: 10 * 60 * 1000, // 10 دقائق
    // تقليل عمليات إعادة التحميل
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // تحسين الأداء: استخدام useCallback للدالة
  const isWithinDateFilter = useCallback((postDate: string): boolean => {
    if (dateFilter === "all") return true;
    
    const today = new Date();
    const date = new Date(postDate);
    
    if (dateFilter === "today") {
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    }
    
    if (dateFilter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      return date >= weekAgo;
    }
    
    if (dateFilter === "month") {
      return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    }
    
    return true;
  }, [dateFilter]);

  // تحسين الأداء: استخدام useMemo لحساب القيم المشتقة مع مراعاة التبعيات
  const totalPosts = useMemo(() => {
    return statuses.reduce((sum, status) => sum + (status.count || 0), 0);
  }, [statuses]);

  // تحسين الأداء: استخدام useMemo لتصفية البيانات مع التحسين
  const filteredPosts = useMemo(() => {
    if (!postsData || !postsData.length) return [];
    
    // تجنب استخدام filter عدة مرات - استخدام filter واحدة مع تحقق الشروط داخلها
    return postsData.filter((post) => {
      // تحسين البحث بتحويل النص مرة واحدة فقط
      const postTitleLower = post.title.toLowerCase();
      const searchQueryLower = searchQuery.toLowerCase();
      
      const matchesSearch = !searchQuery || postTitleLower.includes(searchQueryLower);
      if (!matchesSearch) return false;
      
      const matchesStatus = statusFilter === "all" || post.status === statusFilter;
      if (!matchesStatus) return false;
      
      const matchesPlatform = platformFilter === "all" || post.platform === platformFilter;
      if (!matchesPlatform) return false;
      
      return isWithinDateFilter(post.date);
    });
  }, [postsData, searchQuery, statusFilter, platformFilter, isWithinDateFilter]);

  // تحسين الأداء: استخدام useCallback لمعالجي الأحداث مع تحديد التبعيات بدقة
  const handleRefresh = useCallback(() => {
    toast({
      title: "تم تحديث البيانات",
      description: "تم تحديث حالة المنشورات بنجاح",
    });
  }, [toast]);

  const toggleViewType = useCallback(() => {
    setViewType(prevViewType => prevViewType === "cards" ? "chart" : "cards");
  }, []);

  // استخدام useCallback للدوال التي تتعامل مع تغيير حالة الفلاتر
  const updateSearchQuery = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);
  
  const updateStatusFilter = useCallback((value: string) => {
    setStatusFilter(value);
  }, []);
  
  const updatePlatformFilter = useCallback((value: string) => {
    setPlatformFilter(value);
  }, []);
  
  const updateDateFilter = useCallback((value: string) => {
    setDateFilter(value);
  }, []);

  return {
    viewType,
    isLoading,
    searchQuery,
    statusFilter,
    platformFilter,
    dateFilter,
    statuses,
    postsData,
    totalPosts,
    filteredPosts,
    isRTL,
    setSearchQuery: updateSearchQuery,
    setStatusFilter: updateStatusFilter,
    setPlatformFilter: updatePlatformFilter,
    setDateFilter: updateDateFilter,
    handleRefresh,
    toggleViewType
  };
};
