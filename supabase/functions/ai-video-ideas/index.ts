
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import { OpenAI } from "https://esm.sh/openai@4.20.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Handle CORS preflight requests
export const corsResponse = () => {
  return new Response(null, {
    headers: corsHeaders
  });
};

export const generateVideoIdea = async (productType: string, platform: string, duration: string, style: string) => {
  const openai = new OpenAI({
    apiKey: Deno.env.get('OPENAI_API_KEY'),
  });
  
  try {
    const prompt = `أنت خبير تسويق محترف متخصص في صناعة فيديوهات للمنتجات الجمالية.
يرجى إنشاء فكرة فيديو قوية لمنتج من نوع "${productType}" ليتم نشرها على "${platform}".
مدة الفيديو المطلوبة: "${duration}" ثانية.
الأسلوب المفضل: "${style}".

يجب أن تتضمن فكرة الفيديو:
1. مفهوم إبداعي للعرض
2. سيناريو مختصر للفيديو
3. نصائح للتصوير واختيار الإضاءة
4. توصيات للصوت أو الموسيقى الخلفية
5. أفكار للنص والشعارات التي يمكن استخدامها

كن محدداً وعملياً بحيث يمكن تطبيق أفكارك بسهولة. يجب أن تُظهر فكرة الفيديو المنتج بطريقة جذابة وتناسب جمهور المنصة المستهدفة.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "أنت مساعد ذكي متخصص في استراتيجيات التسويق بالفيديو للمنتجات الجمالية. أنت تقدم أفكاراً عملية وإبداعية."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    return {
      videoIdea: response.choices[0].message.content,
    };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error(`خطأ في إنشاء فكرة الفيديو: ${error.message || error}`);
  }
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return corsResponse();
  }
  
  try {
    // Get request body
    const requestData = await req.json();
    const { productType, platform, duration, style } = requestData;
    
    // Validate request data
    if (!productType) {
      return new Response(
        JSON.stringify({ error: "نوع المنتج مطلوب" }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 400 }
      );
    }
    
    // Generate video idea
    const result = await generateVideoIdea(
      productType, 
      platform || "Instagram", 
      duration || "15-30", 
      style || "عصري وجذاب"
    );
    
    return new Response(
      JSON.stringify(result),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "حدث خطأ أثناء إنشاء فكرة الفيديو" }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 500 }
    );
  }
});
