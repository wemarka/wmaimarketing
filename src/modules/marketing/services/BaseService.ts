
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export abstract class BaseService {
  protected tableName: string;
  
  constructor(tableName: string) {
    this.tableName = tableName;
  }
  
  protected async getCurrentUserId(): Promise<string> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    return user.id;
  }
  
  protected handleError(error: any, operation: string): never {
    console.error(`Error ${operation} in ${this.tableName}:`, error);
    
    toast({
      title: "Error",
      description: `Operation failed: ${error.message}`,
      variant: "destructive"
    });
    
    throw error;
  }
}
