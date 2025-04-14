
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defaultQueryConfig } from '@/hooks/useQueryConfig';

interface QueryProviderProps {
  children: React.ReactNode;
}

// إنشاء استنساخ من QueryClient مع إعدادات مُحسنة
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...defaultQueryConfig,
      retry: (failureCount, error: any) => {
        if (error?.status === 404) return false;
        if (error?.status === 401) return false;
        return failureCount < 2;
      },
      // استخدام SWR (stale-while-revalidate) استراتيجية
      staleTime: 2 * 60 * 1000, // 2 دقائق
      gcTime: 10 * 60 * 1000, // 10 دقائق (formerly cacheTime)
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      // Removed suspense configuration
    },
    mutations: {
      retry: 1,
      retryDelay: 3000,
    },
  },
});

// مزود React Query للتطبيق
export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
