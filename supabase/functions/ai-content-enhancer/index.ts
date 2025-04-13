
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

    let prompt = "";
    const lang = language || "Arabic";

    switch (action) {
      case "improve":
        prompt = `تحسين النص التالي للتسويق وجعله أكثر جاذبية وإقناعاً (بنفس لغة النص الأصلي): "${content}"`;
        break;
      case "summarize":
        prompt = `تلخيص النص التالي مع الحفاظ على النقاط الرئيسية (بنفس لغة النص الأصلي): "${content}"`;
        break;
      case "hashtags":
        prompt = `اقتراح 5-7 هاشتاغات مناسبة لمحتوى التسويق التالي باللغة ${lang}: "${content}"`;
        break;
      case "translate":
        prompt = `ترجمة النص التالي إلى اللغة ${lang} مع الحفاظ على المعنى والنبرة التسويقية: "${content}"`;
        break;
      default:
        prompt = `تحسين النص التالي للتسويق (بنفس لغة النص الأصلي): "${content}"`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'أنت مساعد متخصص في تحسين المحتوى التسويقي وجعله أكثر إقناعاً وجاذبية للجمهور المستهدف. تقدم مساعدة باللغة العربية عند الطلب.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error('Error from OpenAI API');
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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
