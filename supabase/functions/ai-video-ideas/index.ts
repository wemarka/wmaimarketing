
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

    const { productType, duration, platform, style } = await req.json();

    if (!productType || !platform) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: productType and platform are required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create system prompt for video script generation
    const systemPrompt = `أنت خبير في إنشاء أفكار وسيناريوهات للفيديوهات التسويقية لمنتجات التجميل. مهمتك إنشاء أفكار إبداعية وفعالة مناسبة للمنصة المحددة وتتماشى مع نوع المنتج والأسلوب المطلوب.`;
    
    // Create user prompt based on provided parameters
    const userPrompt = `أريد فكرة لفيديو تسويقي لمنتج ${productType} على منصة ${platform} بمدة ${duration || '15-30'} ثانية. 
    أسلوب الفيديو يجب أن يكون ${style || 'عصري وجذاب'}. 
    
    قدم لي:
    1. فكرة مختصرة للفيديو
    2. سيناريو مفصل يتضمن المشاهد الرئيسية
    3. النص المقترح (voice over) إن وجد
    4. الموسيقى أو المؤثرات المقترحة
    5. نصائح لتحسين مشاركة المستخدمين`;

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
        temperature: 0.8,
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
      
      throw new Error('Error from OpenAI API: ' + (errorData.error?.message || 'Unknown error'));
    }

    const data = await response.json();
    const videoIdea = data.choices[0]?.message?.content;

    return new Response(
      JSON.stringify({ videoIdea }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in ai-video-ideas function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
