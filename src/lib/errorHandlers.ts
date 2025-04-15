
import { toast } from "@/components/ui/use-toast";

/**
 * Handles errors from Supabase fetch operations with consistent messaging
 * @param error The error object from the fetch operation
 * @param context Additional context about where the error occurred
 * @returns void
 */
export const handleSupabaseError = (error: any, context: string = "fetch operation") => {
  console.error(`Error during ${context}:`, error);
  
  // Network-related errors
  if (error.message?.includes("Failed to fetch") || 
      error.details?.includes("Failed to fetch")) {
    toast({
      title: "Connection error",
      description: "Could not connect to the database. Using cached data instead.",
      variant: "warning"
    });
    return;
  }
  
  // Rate limiting or resource errors
  if (error.code === "PGRST116" || 
      error.message?.includes("ERR_INSUFFICIENT_RESOURCES") || 
      error.details?.includes("ERR_INSUFFICIENT_RESOURCES")) {
    toast({
      title: "Server busy",
      description: "The server is experiencing high load. Using cached data instead.",
      variant: "warning"
    });
    return;
  }
  
  // Default error
  toast({
    title: "Error",
    description: "Something went wrong. Using cached data instead.",
    variant: "destructive"
  });
};

/**
 * Wraps an async operation with error handling and returns a default value if it fails
 * @param operation The async operation to perform
 * @param defaultValue The default value to return if the operation fails
 * @param errorContext Additional context about the operation for error logging
 * @returns The result of the operation or the default value
 */
export async function withFallback<T>(
  operation: Promise<T>,
  defaultValue: T,
  errorContext: string = "operation"
): Promise<T> {
  try {
    return await operation;
  } catch (error) {
    handleSupabaseError(error, errorContext);
    return defaultValue;
  }
}
