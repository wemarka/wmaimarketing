
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { OpenAI } from "https://esm.sh/openai@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error("OpenAI API key is missing");
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const body = await req.json();
    const { content, action, language = 'ar' } = body;

    if (!content) {
      return new Response(
        JSON.stringify({
          error: "Missing required field: content is required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let prompt = '';
    switch (action) {
      case 'improve':
        prompt = `
          أنت خبير في تحسين المحتوى التسويقي لمنتجات التجميل.
          قم بتحسين النص التالي ليكون أكثر جاذبية وتأثيرًا، مع الحفاظ على الرسالة الأساسية:
          
          "${content}"
          
          قم بإعادة صياغة المحتوى بأسلوب احترافي وجذاب، مع إضافة عبارات تسويقية مؤثرة إذا لزم الأمر.
        `;
        break;
      case 'summarize':
        prompt = `
          لخص النص التالي في فقرة واحدة موجزة تحافظ على النقاط الرئيسية:
          
          "${content}"
        `;
        break;
      case 'hashtags':
        prompt = `
          اقترح 5-7 هاشتاغات مناسبة باللغة العربية والإنجليزية لمحتوى منشور عن منتجات التجميل التالي:
          
          "${content}"
          
          قدم الهاشتاغات في صيغة #هاشتاغ فقط، مفصولة بمسافات.
        `;
        break;
      case 'translate':
        prompt = `
          ترجم النص التالي إلى اللغة ${language === 'ar' ? 'العربية' : 'الإنجليزية'} مع مراعاة المصطلحات التسويقية المتخصصة في مجال التجميل:
          
          "${content}"
        `;
        break;
      default:
        prompt = `
          أنت خبير في تحسين المحتوى التسويقي لمنتجات التجميل.
          قم بتحسين النص التالي ليكون أكثر جاذبية وتأثيرًا، مع الحفاظ على الرسالة الأساسية:
          
          "${content}"
          
          قم بإعادة صياغة المحتوى بأسلوب احترافي وجذاب، مع إضافة عبارات تسويقية مؤثرة إذا لزم الأمر.
        `;
    }

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const result = chatCompletion.choices[0]?.message?.content || '';

    return new Response(
      JSON.stringify({ result }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error enhancing content:", error);
    return new Response(
      JSON.stringify({ error: `Error enhancing content: ${error.message}` }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
