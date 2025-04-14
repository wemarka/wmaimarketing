
import { supabase } from "@/integrations/supabase/client";

export interface GenerateImageParams {
  prompt: string;
  style?: 'realistic' | 'artistic' | 'cartoon' | 'vibrant';
  size?: '1:1' | '16:9' | '4:5' | '3:2';
  brand?: string;
  product?: string;
}

export interface GeneratedImage {
  imageUrl: string;
  prompt: string;
  timestamp: string;
}

export const generateImage = async (params: GenerateImageParams): Promise<GeneratedImage> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-ad-image', {
      body: params
    });

    if (error) throw new Error(error.message);

    // Save to recent generations in database
    await saveGeneratedImage({
      prompt: params.prompt,
      imageUrl: data.imageUrl,
      style: params.style || 'realistic',
      brand: params.brand,
      product: params.product
    });

    return {
      imageUrl: data.imageUrl,
      prompt: params.prompt,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export const saveGeneratedImage = async (imageData: {
  prompt: string;
  imageUrl: string;
  style?: string;
  brand?: string;
  product?: string;
}) => {
  const { error } = await supabase
    .from('media_assets')
    .insert({
      name: `AI Generated - ${new Date().toISOString()}`,
      url: imageData.imageUrl,
      type: 'image',
      format: 'png',
      size: 0, // Size would be determined by the actual file
      tags: [
        'ai-generated',
        imageData.style || 'realistic',
        imageData.brand,
        imageData.product
      ].filter(Boolean),
      user_id: (await supabase.auth.getUser()).data.user?.id
    });

  if (error) {
    console.error("Error saving generated image:", error);
    throw error;
  }
};

export const getRecentGenerations = async (limit: number = 5): Promise<GeneratedImage[]> => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  
  const { data, error } = await supabase
    .from('media_assets')
    .select('*')
    .eq('user_id', userId)
    .eq('type', 'image')
    .in('tags', ['ai-generated']) // Fixed: Passing an array with a single string value
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching recent generations:", error);
    throw error;
  }

  return data.map(item => ({
    imageUrl: item.url,
    prompt: item.name.replace('AI Generated - ', ''),
    timestamp: item.created_at
  }));
};
