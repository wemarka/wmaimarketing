
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

    const { platform, product, tone, target, style } = await req.json();

    if (!platform || !product) {
      return new Response(
        JSON.stringify({
          error: "المعلومات الأساسية مفقودة: المنصة والمنتج مطلوبان",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // بناء رسالة النظام بناءً على المدخلات
    const systemPrompt = `أنت خبير في التسويق والإعلان لمنتجات التجميل والعناية بالبشرة. مهمتك إنشاء محتوى إبداعي وفعال مناسب للمنصة المحددة وبالنبرة المطلوبة.`;
    
    // إنشاء رسالة المستخدم بناءً على المعلمات المقدمة
    let userPrompt = `إنشاء محتوى إعلاني جذاب لمنتج "${product}" على منصة ${platform}.`;
    
    // إضافة نبرة المحتوى إذا تم تحديدها
    if (tone) {
      switch(tone) {
        case 'professional':
          userPrompt += ' النبرة: احترافية ورسمية.';
          break;
        case 'friendly':
          userPrompt += ' النبرة: ودية وغير رسمية.';
          break;
        case 'luxury':
          userPrompt += ' النبرة: فاخرة وراقية.';
          break;
        case 'trendy':
          userPrompt += ' النبرة: عصرية وجريئة.';
          break;
        case 'educational':
          userPrompt += ' النبرة: تعليمية وإرشادية.';
          break;
      }
    }
    
    // إضافة الجمهور المستهدف إذا تم تحديده
    if (target) {
      userPrompt += ` الجمهور المستهدف: ${target}.`;
    }
    
    // إضافة أسلوب الإعلان إذا تم تحديده
    if (style) {
      userPrompt += ` أسلوب الإعلان: ${style}.`;
    }
    
    // إضافة إرشادات خاصة بالمنصة
    switch(platform.toLowerCase()) {
      case 'instagram':
        userPrompt += ' يرجى تضمين هاشتاغات مناسبة والاهتمام بالإيجاز مع تأثير بصري قوي.';
        break;
      case 'facebook':
        userPrompt += ' يمكن أن يكون المحتوى أطول مع تضمين تفاصيل أكثر ودعوة للتفاعل.';
        break;
      case 'tiktok':
        userPrompt += ' محتوى قصير وجذاب مع نبرة عصرية وهاشتاغات شائعة.';
        break;
    }

    console.log(`توليد محتوى إعلاني للمنصة: ${platform}, المنتج: ${product}, النبرة: ${tone || 'غير محددة'}`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
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
      console.error('خطأ في API لـ OpenAI:', JSON.stringify(errorData, null, 2));
      
      if (errorData.error?.type === "authentication_error") {
        return new Response(
          JSON.stringify({ 
            error: "خطأ في المصادقة مع OpenAI. يرجى التحقق من مفتاح API الخاص بك." 
          }),
          {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: `خطأ من OpenAI API: ${errorData.error?.message || 'خطأ غير معروف'}`,
          details: errorData 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;
    
    // إذا كان المحتوى على Instagram، استخرج الهاشتاغات
    let hashtags = [];
    if (platform.toLowerCase() === 'instagram') {
      const hashtagRegex = /#[^\s#]+/g;
      const matches = generatedContent.match(hashtagRegex);
      if (matches) {
        hashtags = matches.map(tag => tag.substring(1));
      }
    }

    return new Response(
      JSON.stringify({ 
        content: generatedContent,
        hashtags: hashtags 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('خطأ في وظيفة توليد المحتوى الإعلاني:', error);
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
