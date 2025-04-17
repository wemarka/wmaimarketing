
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export abstract class BaseService {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected async getCurrentUserId(): Promise<string> {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      throw new Error("User not authenticated");
    }
    
    return user.id;
  }

  protected handleError<T>(error: any, operation: string): T {
    console.error(`Error ${operation}:`, error);
    
    toast({
      title: `خطأ`,
      description: `حدث خطأ أثناء ${operation}`,
      variant: "destructive"
    });
    
    throw error;
  }
}
