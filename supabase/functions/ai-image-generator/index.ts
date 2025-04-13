
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

    // تحضير وصف إضافي بناءً على الأسلوب المطلوب
    let styleDescription = "";
    switch (style) {
      case "glamour":
        styleDescription = "في أسلوب فاخر وأنيق، صورة احترافية لمنتج تجميلي،";
        break;
      case "natural":
        styleDescription = "صورة طبيعية بإضاءة ناعمة لمنتج تجميلي، أسلوب طبيعي،";
        break;
      case "vibrant":
        styleDescription = "صورة نابضة بالحياة ذات ألوان زاهية لمنتج تجميلي،";
        break;
      default:
        styleDescription = "صورة احترافية لمنتج تجميلي،";
    }

    // إعداد الوصف النهائي
    const finalPrompt = `${styleDescription} ${prompt}`;
    console.log("Generating image with prompt:", finalPrompt);

    // استدعاء واجهة برمجة DALL-E
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
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error('Error from OpenAI API');
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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
