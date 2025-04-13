
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

    const { content, analysisType } = await req.json();

    if (!content) {
      return new Response(
        JSON.stringify({
          error: "Missing required field: content is required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Prepare system prompt based on the analysis type
    let systemPrompt = "أنت محلل محتوى خبير. قم بتحليل النص المقدم وتقديم تحليل مفصل.";
    let userPrompt = "";
    
    switch (analysisType) {
      case "sentiment":
        systemPrompt = "أنت محلل محتوى متخصص في تحليل المشاعر. قم بتحليل النص لتحديد المشاعر والانطباعات التي ينقلها.";
        userPrompt = `قم بتحليل المشاعر في النص التالي وتحديد ما إذا كان إيجابيًا أو سلبيًا أو محايدًا، مع تقديم درجة قوة هذه المشاعر والكلمات الرئيسية التي تدل عليها:\n\n${content}`;
        break;
      case "marketing":
        systemPrompt = "أنت محلل تسويقي متخصص في تقييم فعالية المحتوى التسويقي لمنتجات التجميل.";
        userPrompt = `قم بتحليل فعالية هذا المحتوى التسويقي وتقييم النقاط التالية: جاذبية الرسالة، استخدام نقاط البيع الفريدة، الإقناع، الدعوة للعمل، واقتراحات للتحسين:\n\n${content}`;
        break;
      case "seo":
        systemPrompt = "أنت محلل متخصص في تحسين محركات البحث (SEO) لمنتجات التجميل ومواقع العناية بالبشرة.";
        userPrompt = `قم بتحليل هذا المحتوى من ناحية SEO وتقديم تقرير عن: الكلمات المفتاحية المستخدمة وكثافتها، بنية النص، العناوين الفرعية، طول المحتوى، واقتراحات للتحسين:\n\n${content}`;
        break;
      case "audience":
        systemPrompt = "أنت محلل متخصص في تحديد الجمهور المستهدف لمنتجات التجميل والعناية بالبشرة.";
        userPrompt = `قم بتحليل هذا المحتوى وتحديد: الجمهور المستهدف، العمر المحتمل، الاهتمامات، المستوى الثقافي والاقتصادي، ومدى ملاءمة المحتوى لهذا الجمهور:\n\n${content}`;
        break;
      default:
        userPrompt = `قم بتحليل النص التالي وتقديم نظرة شاملة عن جوانب القوة والضعف فيه، مع اقتراحات للتحسين:\n\n${content}`;
    }

    console.log(`Processing content analysis request for analysis type: ${analysisType}`);
    console.log(`Using OpenAI API key: ${OPENAI_API_KEY.substring(0, 3)}...${OPENAI_API_KEY.substring(OPENAI_API_KEY.length - 4)}`);

    // Call OpenAI API
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
    const analysis = data.choices[0]?.message?.content;

    return new Response(
      JSON.stringify({ analysis }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in ai-content-analyzer function:', error);
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
