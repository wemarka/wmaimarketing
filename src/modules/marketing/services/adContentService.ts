
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface GenerateAdContentParams {
  platform: string;
  product: string;
  tone?: 'professional' | 'friendly' | 'luxury' | 'trendy' | 'educational';
  target?: string;
  style?: string;
}

export interface AdContentResult {
  content: string;
  hashtags?: string[];
}

/**
 * توليد محتوى إعلاني باستخدام OpenAI
 */
export const generateAdContent = async (params: GenerateAdContentParams): Promise<AdContentResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-ad-content', {
      body: params
    });

    if (error) {
      // تحسين رسائل الخطأ المحددة
      if (error.message.includes('timeout')) {
        throw new Error("انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى لاحقاً");
      } else if (error.message.includes('authentication')) {
        throw new Error("خطأ في المصادقة مع OpenAI. يرجى التحقق من إعدادات API");
      } else {
        throw new Error(error.message);
      }
    }

    if (data.error) {
      throw new Error(data.error);
    }

    return {
      content: data.content,
      hashtags: data.hashtags || []
    };
  } catch (error) {
    console.error("خطأ في توليد المحتوى الإعلاني:", error);
    toast({
      title: "حدث خطأ",
      description: error instanceof Error ? error.message : "حدث خطأ أثناء توليد المحتوى",
      variant: "destructive"
    });
    throw error;
  }
};

/**
 * تحسين محتوى إعلاني حالي
 */
export const enhanceAdContent = async (
  currentContent: string,
  platform: string
): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-ad-content', {
      body: {
        platform,
        product: 'تحسين محتوى حالي',
        existingContent: currentContent,
        tone: 'professional'
      }
    });

    if (error || data.error) {
      console.error("خطأ في تحسين المحتوى:", error || data.error);
      // إذا حدث خطأ، نعيد المحتوى الحالي دون تغيير
      return currentContent;
    }

    return data.content;
  } catch (error) {
    console.error("خطأ في تحسين المحتوى الإعلاني:", error);
    toast({
      title: "تعذر تحسين المحتوى",
      description: "حدث خطأ أثناء محاولة تحسين المحتوى الحالي",
      variant: "destructive"
    });
    // في حالة الخطأ، نعيد المحتوى الحالي دون تغيير
    return currentContent;
  }
};

/**
 * توليد أفكار لعناوين إعلانية
 */
export const generateAdTitles = async (
  product: string,
  count: number = 5
): Promise<string[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-ad-content', {
      body: {
        platform: 'titles',
        product,
        count
      }
    });

    if (error || data.error) {
      throw new Error(error?.message || data?.error || "حدث خطأ في توليد العناوين");
    }

    // نقسم المحتوى المولد إلى عناوين منفصلة
    const titles = data.content
      .split(/\n+/)
      .map((line: string) => line.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter((line: string) => line.length > 0)
      .slice(0, count);

    return titles;
  } catch (error) {
    console.error("خطأ في توليد عناوين إعلانية:", error);
    toast({
      title: "حدث خطأ",
      description: "تعذر توليد عناوين إعلانية",
      variant: "destructive"
    });
    return [];
  }
};
