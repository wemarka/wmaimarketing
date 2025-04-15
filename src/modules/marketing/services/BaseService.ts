
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export abstract class BaseService {
  protected tableName: string;
  protected t: ReturnType<typeof useTranslation>['t'];
  
  constructor(tableName: string) {
    this.tableName = tableName;
    const { t } = useTranslation();
    this.t = t;
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
      title: this.t('common.error'),
      description: `${this.t('common.operationFailed')}: ${error.message}`,
      variant: "destructive"
    });
    
    throw error;
  }
}
