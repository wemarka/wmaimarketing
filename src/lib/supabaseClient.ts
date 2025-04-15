
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { PostgrestError } from "@supabase/supabase-js";

type TableNames = keyof Database['public']['Tables'];

/**
 * Type-safe wrapper for Supabase queries
 * @param tableName The table name (must be a valid table in the database)
 */
export async function safeQuery<T = any>(
  tableName: TableNames,
  query: (queryBuilder: ReturnType<typeof supabase.from>) => Promise<{
    data: T | null;
    error: PostgrestError | null;
  }>
): Promise<{ data: T | null; error: PostgrestError | string | null }> {
  try {
    // Use the typed table name which is now restricted to valid tables
    const queryBuilder = supabase.from(tableName as string);
    const result = await query(queryBuilder);
    return result;
  } catch (err) {
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
  tableName: TableNames,
  query: (queryBuilder: ReturnType<typeof supabase.from>) => Promise<{
    data: T | null;
    error: PostgrestError | null;
  }>,
  retries = 3,
  delay = 1000
): Promise<{ data: T | null; error: PostgrestError | string | null }> {
  let attempts = 0;

  while (attempts < retries) {
    const result = await safeQuery<T>(tableName, query);
    
    // If successful or no resource error, return immediately
    if (!result.error || (typeof result.error === 'object' && result.error?.code !== 'PGRST116')) {
      return result;
    }
    
    // Increment attempt counter
    attempts++;
    
    // If we've used all retries, return the error
    if (attempts >= retries) {
      return result;
    }
    
    // Wait before retry with exponential backoff
    await new Promise(resolve => setTimeout(resolve, delay * attempts));
  }
  
  return { data: null, error: "Maximum retries exceeded" };
}
