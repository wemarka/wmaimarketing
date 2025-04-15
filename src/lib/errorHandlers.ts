import { toast } from "@/components/ui/use-toast";

/**
 * Error types for better categorization and handling
 */
export enum ErrorType {
  NETWORK_ERROR = "NETWORK_ERROR",
  RESOURCE_ERROR = "RESOURCE_ERROR",
  AUTH_ERROR = "AUTH_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR"
}

/**
 * Determines the type of error based on the error object
 */
export const getErrorType = (error: any): ErrorType => {
  // Network connectivity errors
  if (error.message?.includes("Failed to fetch") || 
      error.details?.includes("Failed to fetch")) {
    return ErrorType.NETWORK_ERROR;
  }
  
  // Resource limitations or rate limiting
  if (error.code === "PGRST116" || 
      error.message?.includes("ERR_INSUFFICIENT_RESOURCES") || 
      error.details?.includes("ERR_INSUFFICIENT_RESOURCES") ||
      error.message?.includes("429") ||
      error.details?.includes("429")) {
    return ErrorType.RESOURCE_ERROR;
  }
  
  // Authentication errors
  if (error.code === "PGRST301" || 
      error.code === "401" ||
      error.message?.includes("unauthorized")) {
    return ErrorType.AUTH_ERROR;
  }
  
  return ErrorType.UNKNOWN_ERROR;
};

/**
 * Handles errors from Supabase fetch operations with consistent messaging
 * @param error The error object from the fetch operation
 * @param context Additional context about where the error occurred
 * @returns void
 */
export const handleSupabaseError = (error: any, context: string = "fetch operation") => {
  console.error(`Error during ${context}:`, error);
  
  const errorType = getErrorType(error);
  
  switch (errorType) {
    case ErrorType.NETWORK_ERROR:
      toast({
        title: "Connection error",
        description: "Could not connect to the database. Using cached data instead.",
        variant: "warning"
      });
      break;
    
    case ErrorType.RESOURCE_ERROR:
      toast({
        title: "Server busy",
        description: "The server is experiencing high load. Using cached data instead.",
        variant: "warning"
      });
      break;
      
    case ErrorType.AUTH_ERROR:
      toast({
        title: "Authentication error",
        description: "Please log in again to continue.",
        variant: "destructive"
      });
      break;
    
    default:
      toast({
        title: "Error",
        description: "Something went wrong. Using cached data instead.",
        variant: "destructive"
      });
  }
};

/**
 * Global request queue to limit concurrent Supabase requests
 */
class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private concurrentLimit = 3; // Maximum concurrent requests
  private activeRequests = 0;

  public async add<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          this.activeRequests++;
          const result = await request();
          resolve(result);
          return result;
        } catch (error) {
          reject(error);
          throw error;
        } finally {
          this.activeRequests--;
          this.processNext();
        }
      });
      
      // Start processing if not already in progress
      if (!this.processing) {
        this.processNext();
      }
    });
  }

  private async processNext() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }
    
    this.processing = true;
    
    // Only process if we're below the concurrent limit
    if (this.activeRequests < this.concurrentLimit) {
      const request = this.queue.shift();
      if (request) {
        try {
          await request();
        } catch (error) {
          console.error("Error processing queued request:", error);
        }
      }
    }
    
    // Keep processing if there are more items in the queue and we're below the limit
    if (this.queue.length > 0 && this.activeRequests < this.concurrentLimit) {
      this.processNext();
    } else if (this.queue.length === 0) {
      this.processing = false;
    }
  }
}

// Create a singleton instance of the request queue
export const requestQueue = new RequestQueue();

/**
 * Wraps an async operation with error handling, queuing, caching and returns a default value if it fails
 * @param operation The async operation to perform
 * @param defaultValue The default value to return if the operation fails
 * @param errorContext Additional context about the operation for error logging
 * @param cacheKey Optional key to use for caching the successful result
 * @returns The result of the operation or the default value
 */
export async function withFallback<T>(
  operation: Promise<T>,
  defaultValue: T,
  errorContext: string = "operation",
  cacheKey?: string,
  cacheTTL: number = 30 * 60 * 1000 // 30 minutes by default
): Promise<T> {
  // Try to get from cache first if a cacheKey is provided
  if (cacheKey) {
    const cachedData = getCachedData<T>(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  }

  try {
    // Queue the request to limit concurrency
    const result = await requestQueue.add(() => operation);
    
    // Cache the successful result if a cacheKey was provided
    if (cacheKey && result) {
      setCachedData(cacheKey, result, cacheTTL);
    }
    
    return result;
  } catch (error) {
    handleSupabaseError(error, errorContext);
    
    // If cacheKey is provided, try to get stale data from cache even if expired
    if (cacheKey) {
      const staleData = getStaleData<T>(cacheKey);
      if (staleData) {
        return staleData;
      }
    }
    
    return defaultValue;
  }
}

/**
 * Cache data in localStorage with expiry
 */
export function setCachedData<T>(key: string, data: T, ttl: number = 30 * 60 * 1000): void {
  try {
    const now = new Date();
    const item = {
      data,
      expiry: now.getTime() + ttl,
      timestamp: now.getTime()
    };
    localStorage.setItem(`cache_${key}`, JSON.stringify(item));
  } catch (e) {
    console.error("Error setting cached data:", e);
  }
}

/**
 * Get data from cache if not expired
 */
export function getCachedData<T>(key: string): T | null {
  try {
    const itemStr = localStorage.getItem(`cache_${key}`);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    const now = new Date();
    
    // Return null if expired
    if (now.getTime() > item.expiry) {
      return null;
    }
    
    return item.data as T;
  } catch (e) {
    console.error("Error getting cached data:", e);
    return null;
  }
}

/**
 * Get stale data from cache even if expired (useful for fallbacks)
 * but only if it's not too old (less than 24 hours)
 */
export function getStaleData<T>(key: string, maxAge: number = 24 * 60 * 60 * 1000): T | null {
  try {
    const itemStr = localStorage.getItem(`cache_${key}`);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    const now = new Date();
    
    // Only return data if it's not too old
    if (now.getTime() - item.timestamp > maxAge) {
      return null;
    }
    
    return item.data as T;
  } catch (e) {
    console.error("Error getting stale data:", e);
    return null;
  }
}
