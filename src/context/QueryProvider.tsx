
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getQueryClientConfig } from '@/hooks/useQueryConfig';

interface QueryProviderProps {
  children: React.ReactNode;
}

// إنشاء استنساخ من QueryClient مع إعدادات مُحسنة
const queryClient = new QueryClient(getQueryClientConfig());

// مزود React Query للتطبيق
export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
