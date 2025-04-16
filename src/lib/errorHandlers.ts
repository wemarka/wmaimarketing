
import { PostgrestError } from "@supabase/supabase-js";

// Queue for handling concurrent Supabase requests
export const requestQueue = {
  add: async <T>(requestFn: () => Promise<T>): Promise<T> => {
    return requestFn(); // Simple implementation - can be expanded with actual queue
  }
};

// Error type enum to categorize different error types
export enum ErrorType {
  AUTH_ERROR = "auth_error",
  RESOURCE_ERROR = "resource_error", 
  NETWORK_ERROR = "network_error",
  UNKNOWN_ERROR = "unknown_error"
}

// Get the type of error for proper handling
export const getErrorType = (error: any): ErrorType => {
  if (!error) return ErrorType.UNKNOWN_ERROR;
  
  const errorMessage = typeof error === 'string' 
    ? error.toLowerCase()
    : (error.message || '').toLowerCase();
  
  // Authentication errors
  if (
    errorMessage.includes('unauthorized') || 
    errorMessage.includes('auth') || 
    errorMessage.includes('permission') || 
    errorMessage.includes('not allowed')
  ) {
    return ErrorType.AUTH_ERROR;
  }
  
  // Resource limitation errors
  if (
    errorMessage.includes('limit') || 
    errorMessage.includes('quota') || 
    errorMessage.includes('rate') || 
    errorMessage.includes('too many')
  ) {
    return ErrorType.RESOURCE_ERROR;
  }
  
  // Network errors
  if (
    errorMessage.includes('network') || 
    errorMessage.includes('connection') || 
    errorMessage.includes('timeout') || 
    errorMessage.includes('fetch')
  ) {
    return ErrorType.NETWORK_ERROR;
  }
  
  return ErrorType.UNKNOWN_ERROR;
};

// Handle Supabase errors with consistent logging
export const handleSupabaseError = (error: PostgrestError | Error | string | unknown, context: string = ''): void => {
  if (typeof error === 'string') {
    console.error(`Supabase error in ${context}: ${error}`);
    return;
  }

  // Handle PostgrestError
  if (typeof error === 'object' && error && 'code' in error) {
    const pgError = error as PostgrestError;
    console.error(`Supabase error in ${context}: Code: ${pgError.code}, Message: ${pgError.message}, Details: ${pgError.details}`);
    return;
  }

  // Handle standard Error
  if (error instanceof Error) {
    console.error(`Error in ${context}: ${error.message}`, error);
    return;
  }

  // Fallback for unknown error types
  console.error(`Unknown error in ${context}:`, error);
};

// Generic fallback function to safely execute operations with a fallback
export async function withFallback<T>(
  promise: Promise<T>, 
  fallbackValue: T, 
  context: string = '',
  cacheKey: string | null = null
): Promise<T> {
  try {
    const result = await promise;
    
    // Optionally cache successful result
    if (cacheKey && result) {
      setCachedData(cacheKey, result);
    }
    
    return result;
  } catch (error) {
    handleSupabaseError(error, context);
    
    // Try to get from cache if available
    if (cacheKey) {
      const cachedData = getCachedData<T>(cacheKey);
      if (cachedData) return cachedData;
    }
    
    return fallbackValue;
  }
}

// Cache utilities for offline resilience
export function setCachedData<T>(key: string, data: T, ttl: number = 3600000): void {
  try {
    const item = {
      value: data,
      expiry: Date.now() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error("Error setting cache:", error);
  }
}

export function getCachedData<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    const parsedItem = JSON.parse(item);
    
    // Check if item is expired
    if (parsedItem.expiry && parsedItem.expiry < Date.now()) {
      localStorage.removeItem(key);
      return null;
    }
    
    return parsedItem.value as T;
  } catch (error) {
    console.error("Error getting cache:", error);
    return null;
  }
}
