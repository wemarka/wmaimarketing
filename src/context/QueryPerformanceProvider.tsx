
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface QueryPerformanceProviderProps {
  children: ReactNode;
}

/**
 * مزود خاص بتحسين أداء TanStack Query على مستوى التطبيق
 * يعمل على تكوين مثيل QueryClient بإعدادات محسنة للأداء
 */
export const QueryPerformanceProvider: React.FC<QueryPerformanceProviderProps> = ({ children }) => {
  // إنشاء كائن QueryClient مع إعدادات الأداء المحسنة
  const queryClient = React.useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        // تقليل عدد عمليات إعادة الطلب عند حدوث أخطاء
        retry: (failureCount, error: any) => {
          // فقط إعادة المحاولة للأخطاء التي يمكن التعافي منها
          if (error?.status === 404) {
            return false; // لا تعيد المحاولة لأخطاء 404
          }
          if (error?.status >= 500) {
            return failureCount < 2; // إعادة المحاولة مرتين فقط لأخطاء الخادم
          }
          return failureCount < 1; // إعادة المحاولة مرة واحدة فقط للأخطاء الأخرى
        },
        // تأخير متزايد بين محاولات إعادة الطلب
        retryDelay: attemptIndex => Math.min(1000 * Math.pow(1.5, attemptIndex), 10000),
        // تخزين النتائج لفترة أطول
        staleTime: 3 * 60 * 1000, // 3 دقائق
        gcTime: 10 * 60 * 1000, // 10 دقائق
        // تقليل عمليات إعادة الطلب غير الضرورية
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        // استخدام البيانات القديمة أثناء تحديث البيانات
        placeholderData: previousData => previousData, // Using function format instead of string
      },
      mutations: {
        // تقليل عدد عمليات إعادة المحاولة للطلبات المتعلقة بالتعديل
        retry: (failureCount, error: any) => {
          if (error?.status === 403 || error?.status === 401) {
            return false; // لا تعيد المحاولة لأخطاء المصادقة والصلاحيات
          }
          return failureCount < 1; // محاولة واحدة إضافية فقط للأخطاء الأخرى
        },
        // تأخير متزايد بين محاولات إعادة الطلب للمهام التعديلية
        retryDelay: attemptIndex => Math.min(1000 * Math.pow(1.3, attemptIndex), 5000),
      }
    },
  }), []);

  // Set up global error handler with the correct event typing
  React.useEffect(() => {
    // Subscribe to query cache with proper type handling
    const unsubscribe = queryClient.getQueryCache().subscribe(event => {
      // Handle all events that might have an error property
      if ('error' in event && event.error) {
        console.error(`Global query error:`, event.error);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  );
};

export default QueryPerformanceProvider;
