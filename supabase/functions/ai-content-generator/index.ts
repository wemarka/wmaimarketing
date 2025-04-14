
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not set')
    }

    const { platform, language, tone, product } = await req.json()

    if (!platform || !language) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: platform and language are required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Create system prompt for content generation
    const systemPrompt = `أنت خبير في إنشاء محتوى تسويقي جذاب لمنتجات التجميل والعناية بالبشرة. مهمتك إنشاء محتوى إبداعي وفعال مناسب للمنصة المحددة وبالنبرة المطلوبة.`
    
    // Create user prompt based on provided parameters
    let userPrompt = `إنشاء محتوى تسويقي لمنتج تجميل`
    
    if (product) {
      userPrompt += ` (${product})`
    }
    
    userPrompt += ` على منصة ${platform}.`
    
    // Add tone specification
    switch(tone) {
      case 'professional':
        userPrompt += ' النبرة: احترافية ورسمية.'
        break
      case 'friendly':
        userPrompt += ' النبرة: ودية وغير رسمية.'
        break
      case 'luxury':
        userPrompt += ' النبرة: فاخرة وراقية.'
        break
      case 'trendy':
        userPrompt += ' النبرة: عصرية وجريئة.'
        break
      case 'educational':
        userPrompt += ' النبرة: تعليمية وإرشادية.'
        break
    }
    
    // Add language specification
    userPrompt += language === 'both' 
      ? ' اكتب المحتوى باللغتين الإنجليزية والعربية.' 
      : ` اكتب المحتوى باللغة ${language === 'english' ? 'الإنجليزية' : 'العربية'}.`
    
    // Platform-specific guidance
    switch(platform) {
      case 'instagram':
        userPrompt += ' تضمين هاشتاغات مناسبة والاهتمام بالإيجاز مع تأثير بصري قوي.'
        break
      case 'facebook':
        userPrompt += ' يمكن أن يكون المحتوى أطول مع تضمين تفاصيل أكثر ودعوة للتفاعل.'
        break
      case 'tiktok':
        userPrompt += ' محتوى قصير وجذاب مع نبرة عصرية وهاشتاغات شائعة.'
        break
    }

    console.log(`Generating content for platform: ${platform}, language: ${language}, tone: ${tone}`)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
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
    const generatedContent = data.content[0].text

    return new Response(
      JSON.stringify({ content: generatedContent }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in ai-content-generator function:', error)
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
