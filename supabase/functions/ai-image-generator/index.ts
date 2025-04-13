
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
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
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
    console.log(`Using OpenAI API key: ${OPENAI_API_KEY.substring(0, 3)}...${OPENAI_API_KEY.substring(OPENAI_API_KEY.length - 4)}`);

    // Call DALL-E API
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: finalPrompt,
        n: 1,
        size: size || "1024x1024",
        quality: "standard",
        response_format: "url",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', JSON.stringify(errorData, null, 2));
      
      // Handle common OpenAI API errors with clear messages
      if (errorData.error?.type === "insufficient_quota" || 
          errorData.error?.code === "insufficient_quota" ||
          errorData.error?.code === "billing_hard_limit_reached") {
        return new Response(
          JSON.stringify({ 
            error: "OpenAI API key has insufficient credits or has reached its billing limit. Please check your OpenAI account billing details." 
          }),
          {
            status: 402, // Payment Required
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      // Return more specific error information
      return new Response(
        JSON.stringify({ 
          error: `Error from OpenAI API: ${errorData.error?.message || 'Unknown error'}`,
          details: errorData 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

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
