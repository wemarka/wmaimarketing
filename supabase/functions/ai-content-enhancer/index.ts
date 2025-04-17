
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

interface EnhanceContentParams {
  content: string;
  action: 'improve' | 'summarize' | 'hashtags' | 'translate';
  language?: string;
}

export const enhanceContent = async (params: EnhanceContentParams) => {
  const openai = new OpenAI({
    apiKey: Deno.env.get('OPENAI_API_KEY'),
  });
  
  try {
    let prompt = '';
    
    switch (params.action) {
      case 'improve':
        prompt = `قم بتحسين النص التسويقي التالي ليكون أكثر جاذبية وإقناعاً مع الحفاظ على نفس المعنى والأفكار الأساسية:
        
        "${params.content}"
        
        قم بإعادة صياغة النص ليكون أكثر تأثيراً وجاذبية مع إضافة عناصر إقناع تسويقية مناسبة. اجعله مباشراً ومقنعاً.`;
        break;
        
      case 'summarize':
        prompt = `قم بتلخيص النص التالي مع الحفاظ على النقاط الأساسية والرسائل المهمة:
        
        "${params.content}"
        
        قدم ملخصاً موجزاً لا يتجاوز 3-4 جمل.`;
        break;
        
      case 'hashtags':
        prompt = `اقترح 5-8 هاشتاغات مناسبة وفعالة للنص التسويقي التالي:
        
        "${params.content}"
        
        الهاشتاغات يجب أن تكون مرتبطة بالمحتوى، شائعة، ومناسبة للتسويق على وسائل التواصل الاجتماعي. قدمهم في صيغة هاشتاغ (#).`;
        break;
        
      case 'translate':
        prompt = `ترجم النص التالي من اللغة العربية إلى اللغة ${params.language || 'الإنجليزية'} مع الحفاظ على المعنى والأسلوب:
        
        "${params.content}"
        
        قدم ترجمة دقيقة تحافظ على نفس الأسلوب التسويقي والنبرة الإعلانية للنص الأصلي.`;
        break;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "أنت مساعد متخصص في تحسين المحتوى التسويقي والإبداعي باللغة العربية."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return {
      result: response.choices[0].message.content,
      action: params.action
    };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error(`خطأ في معالجة المحتوى: ${error.message || error}`);
  }
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return corsResponse();
  }
  
  try {
    // Get request body
    const requestData = await req.json() as EnhanceContentParams;
    const { content, action, language } = requestData;
    
    // Validate request data
    if (!content || !action) {
      return new Response(
        JSON.stringify({ error: "المحتوى والإجراء مطلوبان" }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 400 }
      );
    }
    
    // Enhance content
    const result = await enhanceContent({
      content,
      action,
      language
    });
    
    return new Response(
      JSON.stringify(result),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "حدث خطأ أثناء معالجة المحتوى" }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 500 }
    );
  }
});
