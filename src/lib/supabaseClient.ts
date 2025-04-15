
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { PostgrestError } from "@supabase/supabase-js";

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
  delay = 1000
): Promise<{ data: T | null; error: PostgrestError | string | null }> {
  let attempts = 0;
  let lastError: PostgrestError | string | null = null;

  while (attempts < retries) {
    try {
      const result = await safeQuery<T>(tableName, query);
      
      // If successful, return immediately
      if (!result.error) {
        return result;
      }
      
      // Store the error
      lastError = result.error;
      
      // Resource limitations error or rate limiting
      if ((typeof result.error === 'object' && 
           (result.error?.code === 'PGRST116' || 
            result.error?.message?.includes('insufficient resources') || 
            result.error?.message?.includes('ERR_INSUFFICIENT_RESOURCES'))) || 
          (typeof result.error === 'string' && 
           (result.error.includes('insufficient resources') || 
            result.error.includes('ERR_INSUFFICIENT_RESOURCES')))) {
        
        // Increment attempt counter
        attempts++;
        
        // If we've used all retries, break the loop
        if (attempts >= retries) {
          break;
        }
        
        // Wait before retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempts - 1)));
        continue;
      }
      
      // For non-resource errors, return immediately
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
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempts - 1)));
    }
  }
  
  return { data: null, error: lastError };
}

/**
 * Safe wrapper for Supabase transactions
 * @param operations Array of database operations to execute
 */
export async function safeTransaction<T = any>(
  operations: (() => Promise<{ data: any; error: PostgrestError | null }>)[]
): Promise<{ data: T | null; error: PostgrestError | string | null }> {
  try {
    let results: any[] = [];
    let hasError = false;
    
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
}
