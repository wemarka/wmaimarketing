
import { useQueryClient, QueryKey } from "@tanstack/react-query";

interface QueryConfigOptions {
  staleTime?: number;
  gcTime?: number; // Using gcTime instead of cacheTime
  retry?: number | boolean;
  retryDelay?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  refetchOnMount?: boolean;
}

// قيم افتراضية محسنة للتخزين المؤقت
export const defaultQueryConfig: QueryConfigOptions = {
  staleTime: 5 * 60 * 1000, // 5 دقائق
  gcTime: 30 * 60 * 1000, // 30 دقيقة (formerly cacheTime)
  retry: 2,
  retryDelay: 3000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchOnMount: true
};

// تكوينات خاصة لأنواع مختلفة من البيانات
export const queryConfigs = {
  analyticsData: {
    ...defaultQueryConfig,
    staleTime: 15 * 60 * 1000, // 15 دقيقة للبيانات التحليلية
  },
  userProfile: {
    ...defaultQueryConfig,
    staleTime: 60 * 60 * 1000, // ساعة واحدة لبيانات المستخدم
  },
  activityLogs: {
    ...defaultQueryConfig,
    staleTime: 2 * 60 * 1000, // دقيقتان لسجلات النشاط
  }
};

export function useQueryConfig(type: keyof typeof queryConfigs = "analyticsData") {
  return queryConfigs[type];
}

export function usePrefetchQuery() {
  const queryClient = useQueryClient();
  
  return async <T>(queryKey: QueryKey, queryFn: () => Promise<T>, options?: QueryConfigOptions) => {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn,
      ...defaultQueryConfig,
      ...options
    });
  };
}

export function useInvalidateQueries() {
  const queryClient = useQueryClient();
  
  const invalidateQueries = (queryKey: QueryKey) => {
    return queryClient.invalidateQueries({ queryKey });
  };
  
  return { invalidateQueries };
}
