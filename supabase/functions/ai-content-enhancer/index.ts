
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
    console.log(`Using OpenAI API key: ${OPENAI_API_KEY.substring(0, 3)}...${OPENAI_API_KEY.substring(OPENAI_API_KEY.length - 4)}`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
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
    const enhancedContent = data.choices[0]?.message?.content;

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
