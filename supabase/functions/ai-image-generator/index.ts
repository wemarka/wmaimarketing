
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not set');
    }

    const { prompt, size, style, productImage } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({
          error: "Missing required field: prompt is required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Prepare additional style description based on the requested style
    let styleDescription = "";
    switch (style) {
      case "glamour":
        styleDescription = "صورة فاخرة وأنيقة لمنتج تجميلي، بإضاءة احترافية، خلفية راقية،";
        break;
      case "natural":
        styleDescription = "صورة طبيعية بإضاءة ناعمة لمنتج تجميلي، أسلوب بسيط وواقعي، خلفية هادئة،";
        break;
      case "vibrant":
        styleDescription = "صورة نابضة بالحياة ذات ألوان زاهية لمنتج تجميلي، خلفية عصرية جذابة،";
        break;
      default:
        styleDescription = "صورة احترافية لمنتج تجميلي،";
    }

    // Prepare final prompt
    const finalPrompt = `${styleDescription} ${prompt}، تصوير عالي الجودة، صورة فوتوغرافية احترافية لعرض المنتج في أفضل صورة`;
    console.log("Generating image with prompt:", finalPrompt);

    // Parse size to get dimensions
    let width = 1024;
    let height = 1024; // Default to square format
    if (size) {
      const [w, h] = size.split("x").map(Number);
      if (w && h) {
        width = w;
        height = h;
      }
    }

    // Call Claude 3 API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Generate an image for a beauty product advertisement with these details: ${finalPrompt}`
              }
            ]
          }
        ],
        system: "You are an expert in generating beauty product advertisements. Create attractive, professional product images.",
        tools: [
          {
            name: "image_generation",
            description: "Generate an image based on a text description",
            input_schema: {
              type: "object",
              properties: {
                prompt: {
                  type: "string",
                  description: "The prompt to generate an image from"
                },
                width: {
                  type: "integer",
                  description: "Width of the image in pixels"
                },
                height: {
                  type: "integer",
                  description: "Height of the image in pixels"
                }
              },
              required: ["prompt"]
            }
          }
        ],
        tool_choice: {
          name: "image_generation",
          input: {
            prompt: finalPrompt,
            width: width,
            height: height
          }
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', JSON.stringify(errorData, null, 2));
      
      // Handle common API errors with clear messages
      if (errorData.error?.type === "authentication_error") {
        return new Response(
          JSON.stringify({ 
            error: "Authentication error with Anthropic API. Please check your API key." 
          }),
          {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      // Return more specific error information
      return new Response(
        JSON.stringify({ 
          error: `Error from Anthropic API: ${errorData.error?.message || 'Unknown error'}`,
          details: errorData 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();
    
    // Extract image URL from response
    let imageUrl = null;
    for (const item of data.content) {
      if (item.type === 'image') {
        imageUrl = item.source.url;
        break;
      }
    }

    if (!imageUrl) {
      throw new Error('No image was generated');
    }

    return new Response(
      JSON.stringify({ imageUrl }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in ai-image-generator function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
