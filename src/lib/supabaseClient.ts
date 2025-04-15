
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { PostgrestError } from "@supabase/supabase-js";
import { requestQueue, getErrorType, ErrorType } from "./errorHandlers";

// Define a union type for all valid table names
type TableNames = keyof Database['public']['Tables'];
type ValidTableNames = 'campaigns' | 'media_assets' | 'permissions' | 'posts' | 'products' | 
                     'profiles' | 'role_permissions' | 'social_accounts' | 'user_activity_log' | 'user_invitations';

/**
 * Type-safe wrapper for Supabase queries
 * @param tableName The table name (must be a valid table in the database)
 */
export async function safeQuery<T = any>(
  tableName: ValidTableNames,
  query: (queryBuilder: ReturnType<typeof supabase.from>) => Promise<{
    data: T | null;
    error: PostgrestError | null;
  }>
): Promise<{ data: T | null; error: PostgrestError | string | null }> {
  try {
    // Use the typed table name to ensure it's valid
    const queryBuilder = supabase.from(tableName);
    const result = await query(queryBuilder);
    return result;
  } catch (err) {
    console.error("Error in safeQuery:", err);
    return {
      data: null,
      error: err instanceof Error ? err.message : "An unknown error occurred"
    };
  }
}

/**
 * Fetch data with retry logic to handle resource limitation errors
 */
export async function fetchWithRetry<T = any>(
  tableName: ValidTableNames,
  query: (queryBuilder: ReturnType<typeof supabase.from>) => Promise<{
    data: T | null;
    error: PostgrestError | null;
  }>,
  retries = 3,
  initialDelay = 1000
): Promise<{ data: T | null; error: PostgrestError | string | null }> {
  return requestQueue.add(async () => {
    let attempts = 0;
    let lastError: PostgrestError | string | null = null;
    let delay = initialDelay;

    while (attempts < retries) {
      try {
        const result = await safeQuery<T>(tableName, query);
        
        // If successful, return immediately
        if (!result.error) {
          return result;
        }
        
        // Store the error
        lastError = result.error;
        
        // Check error type to determine retry behavior
        const errorType = getErrorType(result.error);
        
        // Don't retry auth errors
        if (errorType === ErrorType.AUTH_ERROR) {
          return result;
        }
        
        // For resource limitations or network errors, retry with backoff
        if (errorType === ErrorType.RESOURCE_ERROR || 
            errorType === ErrorType.NETWORK_ERROR) {
          // Increment attempt counter
          attempts++;
          
          // If we've used all retries, break the loop
          if (attempts >= retries) {
            break;
          }
          
          // Wait before retry with exponential backoff and jitter
          const jitter = Math.random() * 500; // Add up to 500ms of random jitter
          await new Promise(resolve => setTimeout(resolve, delay + jitter));
          
          // Exponential backoff
          delay = Math.min(delay * 2, 10000); // Cap at 10 seconds
          continue;
        }
        
        // For all other errors, return immediately
        return result;
        
      } catch (err) {
        // Handle unexpected errors
        console.error("Error in fetchWithRetry:", err);
        lastError = err instanceof Error ? err.message : "An unknown error occurred";
        attempts++;
        
        // If we've used all retries, break the loop
        if (attempts >= retries) {
          break;
        }
        
        // Wait before retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        delay = Math.min(delay * 2, 10000); // Cap at 10 seconds
      }
    }
    
    return { data: null, error: lastError };
  });
}

/**
 * Safe wrapper for Supabase transactions
 * @param operations Array of database operations to execute
 */
export async function safeTransaction<T = any>(
  operations: (() => Promise<{ data: any; error: PostgrestError | null }>)[]
): Promise<{ data: T | null; error: PostgrestError | string | null }> {
  return requestQueue.add(async () => {
    try {
      let results: any[] = [];
      
      for (const operation of operations) {
        const result = await operation();
        
        if (result.error) {
          return { data: null, error: result.error };
        }
        
        results.push(result.data);
      }
      
      return { data: results as unknown as T, error: null };
    } catch (err) {
      console.error("Error in safeTransaction:", err);
      return {
        data: null,
        error: err instanceof Error ? err.message : "An unknown error occurred"
      };
    }
  });
}
