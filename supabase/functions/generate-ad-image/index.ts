
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
    
    // Get the Anthropic API key from environment variables
    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not set')
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

    // Determine dimensions based on size parameter
    let width = 1024
    let height = 1024 // Default square format
    
    if (size) {
      switch(size) {
        case '16:9':
          width = 1792
          height = 1024
          break
        case '4:5':
          width = 1024
          height = 1280
          break
        case '3:2':
          width = 1024
          height = 768
          break
      }
    }

    console.log('Generating image with prompt:', enhancedPrompt)
    console.log('Using dimensions:', width, 'x', height)

    // Call Anthropic's Claude 3 API to generate image
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Generate an image for a beauty product advertisement with these details: ${enhancedPrompt}. The image should be high quality and professional looking.`
              }
            ]
          }
        ],
        system: "You are an expert in generating beauty product advertisements. Create attractive, professional product images.",
        tools: [
          {
            name: "image_generation",
            description: "Generate an image based on a text description",
            input_schema: {
              type: "object",
              properties: {
                prompt: {
                  type: "string",
                  description: "The prompt to generate an image from"
                },
                width: {
                  type: "integer",
                  description: "Width of the image in pixels"
                },
                height: {
                  type: "integer",
                  description: "Height of the image in pixels"
                }
              },
              required: ["prompt"]
            }
          }
        ],
        tool_choice: {
          name: "image_generation",
          input: {
            prompt: enhancedPrompt,
            width: width,
            height: height
          }
        }
      })
    })

    const anthropicData = await anthropicResponse.json()
    
    if (anthropicResponse.status !== 200) {
      throw new Error(`Anthropic API error: ${JSON.stringify(anthropicData)}`)
    }

    // Extract the image URL from the response
    const content = anthropicData.content
    let imageUrl = null
    
    for (const item of content) {
      if (item.type === 'image') {
        imageUrl = item.source.url
        break
      }
    }

    if (!imageUrl) {
      throw new Error('No image was generated')
    }

    return new Response(
      JSON.stringify({
        imageUrl: imageUrl,
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
