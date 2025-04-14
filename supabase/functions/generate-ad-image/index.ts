
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    const { prompt, style, size, brand, product } = await req.json()
    
    // Get the OpenAI API key from environment variables
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set')
    }

    // Enhance prompt based on style
    let enhancedPrompt = prompt
    
    if (style) {
      switch(style) {
        case 'realistic':
          enhancedPrompt += ', photorealistic, high quality professional photograph'
          break
        case 'artistic':
          enhancedPrompt += ', artistic style, creative, painterly quality'
          break
        case 'cartoon':
          enhancedPrompt += ', cartoon style, vibrant colors, illustrative'
          break
        case 'vibrant':
          enhancedPrompt += ', vibrant colors, high contrast, eye-catching'
          break
      }
    }

    // Add brand and product context if available
    if (brand) {
      enhancedPrompt += `, ${brand} brand`
    }
    
    if (product) {
      enhancedPrompt += `, featuring ${product}`
    }

    // Add beauty-related context
    enhancedPrompt += ', beauty product advertisement, professional lighting, attractive composition'

    // Convert size parameter to DALL-E size format
    let imageSize = '1024x1024' // Default square format
    
    if (size) {
      switch(size) {
        case '16:9':
          imageSize = '1792x1024'
          break
        case '4:5':
          imageSize = '1024x1280'
          break
        case '3:2':
          imageSize = '1024x768'
          break
      }
    }

    console.log('Generating image with prompt:', enhancedPrompt)
    console.log('Using size:', imageSize)

    // Call OpenAI API to generate image
    const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: enhancedPrompt,
        n: 1,
        size: imageSize,
        quality: 'standard'
      })
    })

    const openaiData = await openaiResponse.json()
    
    if (openaiData.error) {
      throw new Error(`OpenAI API error: ${openaiData.error.message}`)
    }

    return new Response(
      JSON.stringify({
        imageUrl: openaiData.data[0].url,
        prompt: enhancedPrompt
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error generating image:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
