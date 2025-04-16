
import { useState, useCallback } from "react";
import { QueryClientConfig, DefaultOptions } from "@tanstack/react-query";
import { getErrorType, ErrorType } from "@/lib/errorHandlers";

/**
 * Hook that provides standardized React Query configuration with context awareness
 * @param contextLabel Optional context label for better error tracking
 */
export const useQueryConfig = (contextLabel?: string): DefaultOptions => {
  // Enhanced query configuration with optimized retry strategy
  const defaultQueryConfig: DefaultOptions = {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,  // 10 minutes
      retry: (failureCount, error: any) => {
        const errorType = getErrorType(error);
        
        // Don't retry auth errors as they require user intervention
        if (errorType === ErrorType.AUTH_ERROR) {
          return false;
        }
        
        // For resource errors, try a couple times with longer delays
        if (errorType === ErrorType.RESOURCE_ERROR) {
          return failureCount < 2;
        }
        
        // For network errors, retry a few times
        if (errorType === ErrorType.NETWORK_ERROR) {
          return failureCount < 3;
        }
        
        // For other errors, just try once
        return failureCount < 1;
      },
      retryDelay: attemptIndex => {
        // Exponential backoff with jitter for better network resilience
        const base = Math.min(1000 * 2 ** attemptIndex, 10000);
        const jitter = Math.random() * 1000;
        return base + jitter;
      },
      meta: {
        context: contextLabel || 'general'
      }
    },
    mutations: {
      retry: 1,
      retryDelay: 3000
    }
  };

  return defaultQueryConfig;
};

/**
 * Returns configuration for React Query client with optimized settings
 */
export const getQueryClientConfig = (): QueryClientConfig => {
  return {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: (failureCount, error: any) => {
          // Handle common error cases
          if (error?.status === 401 || error?.status === 404) return false;
          return failureCount < 2;
        },
        retryDelay: attemptIndex => {
          // Exponential backoff with jitter
          const base = Math.min(1000 * 2 ** attemptIndex, 10000);
          const jitter = Math.random() * 1000;
          return base + jitter;
        }
      },
      mutations: {
        retry: 1,
        retryDelay: 3000
      }
    }
  };
};
