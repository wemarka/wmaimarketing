
import { enhanceContent } from "@/lib/supabase/models";

interface PromptEnhancementOptions {
  brand?: string;
  product?: string;
  theme?: string;
  style?: string;
  audience?: string;
  additionalContext?: string;
}

/**
 * Enhances a basic prompt with details to improve AI image generation results
 */
export const enhanceImagePrompt = async (
  basePrompt: string,
  options: PromptEnhancementOptions
): Promise<string> => {
  // Build the enhanced prompt with provided options
  let enhancedPrompt = basePrompt;
  
  if (options.brand) {
    enhancedPrompt += `, featuring ${options.brand} brand`;
  }
  
  if (options.product) {
    enhancedPrompt += `, showcasing ${options.product}`;
  }
  
  if (options.style) {
    enhancedPrompt += `, in ${options.style} style`;
  }
  
  if (options.theme) {
    enhancedPrompt += `, with a ${options.theme} theme`;
  }
  
  if (options.audience) {
    enhancedPrompt += `, appealing to ${options.audience}`;
  }
  
  if (options.additionalContext) {
    enhancedPrompt += `, ${options.additionalContext}`;
  }
  
  try {
    // Use AI to further enhance the prompt if OpenAI integration is available
    const enhancement = await enhanceContent({
      content: enhancedPrompt,
      action: 'improve'
    });
    
    return enhancement.result || enhancedPrompt;
  } catch (error) {
    console.error("Error enhancing prompt with AI:", error);
    return enhancedPrompt;
  }
};

/**
 * Translates a prompt to English if needed for better AI image generation results
 */
export const translatePromptIfNeeded = async (prompt: string): Promise<string> => {
  // Detect if the prompt is not in English
  const isNonEnglish = /[^\u0000-\u007F]/.test(prompt);
  
  if (!isNonEnglish) {
    return prompt;
  }
  
  try {
    // Translate the prompt to English
    const translation = await enhanceContent({
      content: prompt,
      action: 'translate',
      language: 'english'
    });
    
    return translation.result || prompt;
  } catch (error) {
    console.error("Error translating prompt:", error);
    return prompt;
  }
};

/**
 * Generate hashtags based on the prompt and generated content
 */
export const generateHashtags = async (
  prompt: string,
  contentType: 'beauty' | 'fashion' | 'lifestyle' | 'product' = 'beauty'
): Promise<string[]> => {
  try {
    const hashtagResponse = await enhanceContent({
      content: prompt,
      action: 'hashtags'
    });
    
    if (hashtagResponse.result) {
      // Parse hashtags from the response
      return hashtagResponse.result
        .split(/\s+/)
        .filter(tag => tag.startsWith('#'))
        .map(tag => tag.replace('#', ''));
    }
    
    return [];
  } catch (error) {
    console.error("Error generating hashtags:", error);
    return [];
  }
};
