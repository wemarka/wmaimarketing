
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not set')
    }

    const { productType, duration, platform, style } = await req.json()

    if (!productType || !platform) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: productType and platform are required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Create system prompt for video script generation
    const systemPrompt = `أنت خبير في إنشاء أفكار وسيناريوهات للفيديوهات التسويقية لمنتجات التجميل. مهمتك إنشاء أفكار إبداعية وفعالة مناسبة للمنصة المحددة وتتماشى مع نوع المنتج والأسلوب المطلوب.`
    
    // Create user prompt based on provided parameters
    const userPrompt = `أريد فكرة لفيديو تسويقي لمنتج ${productType} على منصة ${platform} بمدة ${duration || '15-30'} ثانية. 
    أسلوب الفيديو يجب أن يكون ${style || 'عصري وجذاب'}. 
    
    قدم لي:
    1. فكرة مختصرة للفيديو
    2. سيناريو مفصل يتضمن المشاهد الرئيسية
    3. النص المقترح (voice over) إن وجد
    4. الموسيقى أو المؤثرات المقترحة
    5. نصائح لتحسين مشاركة المستخدمين`

    console.log(`Processing video idea request for product type: ${productType}, platform: ${platform}`)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 2000,
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
        temperature: 0.8,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Anthropic API error:', JSON.stringify(errorData, null, 2))
      
      if (errorData.error?.type === "authentication_error") {
        return new Response(
          JSON.stringify({ 
            error: "Authentication error with Anthropic API. Please check your API key." 
          }),
          {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }
      
      return new Response(
        JSON.stringify({ 
          error: `Error from Anthropic API: ${errorData.error?.message || 'Unknown error'}`,
          details: errorData 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const data = await response.json()
    const videoIdea = data.content[0].text

    return new Response(
      JSON.stringify({ videoIdea }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in ai-video-ideas function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
