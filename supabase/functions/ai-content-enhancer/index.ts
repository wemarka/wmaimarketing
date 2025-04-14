
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

    const { content, action, language } = await req.json();

    if (!content || !action) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: content and action are required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    let systemPrompt = "أنت مساعد متخصص في تحسين المحتوى التسويقي وجعله أكثر إقناعاً وجاذبية للجمهور المستهدف في مجال التجميل ومستحضرات العناية بالبشرة. تقدم مساعدة باللغة العربية عند الطلب.";
    let userPrompt = "";
    const lang = language || "Arabic";

    switch (action) {
      case "improve":
        userPrompt = `تحسين النص التسويقي التالي وجعله أكثر جاذبية وإقناعاً (بنفس لغة النص الأصلي): "${content}"`;
        break;
      case "summarize":
        userPrompt = `تلخيص النص التسويقي التالي مع الحفاظ على النقاط الرئيسية والرسائل التسويقية الأساسية (بنفس لغة النص الأصلي): "${content}"`;
        break;
      case "hashtags":
        userPrompt = `اقتراح 5-7 هاشتاغات مناسبة لمحتوى تسويقي لمنتجات التجميل التالي باللغة ${lang}: "${content}". قدم الهاشتاغات فقط بدون أي نص إضافي.`;
        break;
      case "translate":
        userPrompt = `ترجمة النص التسويقي التالي إلى اللغة ${lang} مع الحفاظ على المعنى والنبرة التسويقية المقنعة: "${content}"`;
        break;
      default:
        userPrompt = `تحسين النص التسويقي التالي (بنفس لغة النص الأصلي): "${content}"`;
    }

    // Log the request for debugging
    console.log(`Processing ${action} request for content length: ${content.length}`);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', JSON.stringify(errorData, null, 2));
      
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
    const enhancedContent = data.content[0].text;

    return new Response(
      JSON.stringify({ enhancedContent }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in ai-content-enhancer function:', error);
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
