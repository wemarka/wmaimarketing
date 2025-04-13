
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

    if (!content || !analysisType) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: content and analysisType are required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create system prompt based on analysis type
    let systemPrompt = "أنت متخصص في تحليل المحتوى التسويقي لمنتجات التجميل ومستحضرات العناية بالبشرة. تقدم تحليلًا موضوعيًا وتوصيات لتحسين فعالية المحتوى.";
    let userPrompt = "";

    switch (analysisType) {
      case "sentiment":
        userPrompt = `تحليل مشاعر وانطباعات المستهلكين من المحتوى التالي. قم بتحديد المشاعر الإيجابية والسلبية والمحايدة، وقدم نسبة مئوية لكل منها، ثم قدم توصيات لتحسين الانطباع العام: "${content}"`;
        break;
      case "marketing":
        userPrompt = `تحليل مدى فعالية المحتوى التسويقي التالي. قم بتقييم العناصر الإقناعية، ونقاط القوة والضعف، والجمهور المستهدف، واقترح تحسينات محددة: "${content}"`;
        break;
      case "seo":
        userPrompt = `تحليل المحتوى التالي من منظور تحسين محركات البحث (SEO) لمنتجات التجميل. حدد الكلمات المفتاحية المستخدمة، واقترح كلمات إضافية، وقدم توصيات لتحسين ظهور المحتوى في نتائج البحث: "${content}"`;
        break;
      case "audience":
        userPrompt = `تحليل الجمهور المستهدف للمحتوى التسويقي التالي. حدد الشرائح المستهدفة، واهتماماتها، واحتياجاتها، وكيفية تلبية المحتوى لها، واقترح تعديلات لزيادة جاذبية المحتوى: "${content}"`;
        break;
      default:
        userPrompt = `تحليل المحتوى التسويقي التالي وتقديم توصيات لتحسينه: "${content}"`;
    }

    console.log(`Processing content analysis request for type: ${analysisType}`);

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
    const analysisResult = data.choices[0]?.message?.content;

    return new Response(
      JSON.stringify({ analysisResult }),
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
