
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const STABILITY_API_KEY = Deno.env.get('STABILITY_API_KEY');
    if (!STABILITY_API_KEY) {
      throw new Error('STABILITY_API_KEY is not set');
    }

    const { prompt, size, style } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Missing required field: prompt" }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get dimensions based on size parameter
    let width = 1024;
    let height = 1024;
    if (size) {
      const [w, h] = size.split("x").map(Number);
      if (w && h) {
        width = w;
        height = h;
      }
    }

    // Enhance prompt based on style
    let enhancedPrompt = prompt;
    if (style) {
      switch(style) {
        case "glamour":
          enhancedPrompt += ", luxury beauty product photography, professional lighting, elegant";
          break;
        case "natural":
          enhancedPrompt += ", natural beauty product photography, soft lighting, minimalist";
          break;
        case "vibrant":
          enhancedPrompt += ", vibrant colors, high-energy beauty product photography, dynamic";
          break;
      }
    }

    console.log("Generating image with prompt:", enhancedPrompt);

    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STABILITY_API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: enhancedPrompt,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: height,
        width: width,
        steps: 30,
        samples: 1
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Stability AI API error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    const imageBase64 = data.artifacts[0].base64;

    return new Response(
      JSON.stringify({ 
        imageUrl: `data:image/png;base64,${imageBase64}`
      }),
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
