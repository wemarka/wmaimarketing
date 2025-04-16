
import { useState } from "react";
import { QueryClientConfig, DefaultOptions } from "@tanstack/react-query";

/**
 * Hook that provides standardized React Query configuration
 * @param contextLabel Optional context label for better error tracking
 */
export const useQueryConfig = (contextLabel?: string): DefaultOptions => {
  const defaultQueryConfig: DefaultOptions = {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,  // 10 minutes
      retry: (failureCount, error: any) => {
        // Limit retries to 2 for most errors
        return failureCount < 2;
      },
      retryDelay: attemptIndex => {
        // Exponential backoff with jitter
        const base = Math.min(1000 * 2 ** attemptIndex, 10000);
        const jitter = Math.random() * 1000;
        return base + jitter;
      }
    }
  };

  return defaultQueryConfig;
};

/**
 * Returns configuration for React Query client
 */
export const getQueryClientConfig = (): QueryClientConfig => {
  return {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
      }
    }
  };
};
