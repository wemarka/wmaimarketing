
import { supabase } from "@/integrations/supabase/client";

interface GenerateContentParams {
  platform: string;
  language: string;
  tone: string;
  product: string;
}

export const generateContent = async (params: GenerateContentParams): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('ai-content-generator', {
      body: params
    });

    if (error) {
      throw error;
    }

    if (data.error) {
      throw new Error(data.error);
    }

    return data.content;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};
