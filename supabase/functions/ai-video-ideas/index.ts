
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
    const { productType, platform, duration, style } = body;

    if (!productType) {
      return new Response(
        JSON.stringify({
          error: "Missing required field: productType is required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const prompt = `
      أنت خبير في تسويق منتجات التجميل عبر وسائل التواصل الاجتماعي.
      اقترح فكرة مفصلة لفيديو مبتكر وإبداعي لمنتج ${productType} يمكن استخدامه على ${platform}.
      
      المدة: ${duration} ثانية
      الأسلوب: ${style}
      
      قدم اقتراحًا مفصلاً يتضمن:
      1. عنوان جذاب للفيديو
      2. المشهد الافتتاحي
      3. تسلسل المشاهد والحركة
      4. النص المقترح والتعليق الصوتي
      5. الرسالة الرئيسية والدعوة للعمل
      6. نصائح تقنية للتصوير والإضاءة والخلفية المناسبة
      
      قدم الإجابة باللغة العربية وبأسلوب احترافي.
    `;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const videoIdea = chatCompletion.choices[0]?.message?.content || '';

    // Log activity in the database
    // This would require Supabase client but for Edge Functions that's not easily possible
    // Instead you could use a custom endpoint to log activity

    return new Response(
      JSON.stringify({ videoIdea }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error generating video idea:", error);
    return new Response(
      JSON.stringify({ error: `Error generating video idea: ${error.message}` }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
