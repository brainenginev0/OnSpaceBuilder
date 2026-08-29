// Powered by OnSpace.AI
import { corsHeaders } from '../_shared/cors.ts';

const MODEL = 'google/gemini-3-flash-preview';

const SYSTEM_PROMPT = `You are an expert mobile app architect. Given a user's app idea prompt, you must analyze it and return a structured JSON response describing the app plan. 

Return ONLY valid JSON with this exact structure (no markdown, no code blocks, just raw JSON):
{
  "appName": "CamelCase app name (1-2 words, catchy)",
  "tagline": "One punchy sentence describing the app value prop",
  "description": "2-3 sentence description of what the app does and its key value",
  "category": "One of: Health, Finance, Food, Wellness, Shopping, Education, Social, Productivity, Entertainment, Travel, Other",
  "primaryColor": "A hex color that fits the app theme (e.g. #22C55E for health, #F59E0B for finance)",
  "screens": [
    { "name": "Screen name", "purpose": "What the user does here" }
  ],
  "components": [
    "ComponentName (brief description)"
  ],
  "features": [
    "Key feature description"
  ],
  "techHighlights": [
    "Technical implementation detail"
  ],
  "estimatedScreens": 5,
  "estimatedComponents": 18,
  "complexity": "Simple | Moderate | Complex"
}

Rules:
- screens array: 3-7 screens appropriate to the app
- components array: 4-8 key UI components
- features array: exactly 3-4 key features
- techHighlights array: exactly 3 items
- Be specific and creative, tailored to the exact prompt
- appName should NOT contain spaces`;

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('ONSPACE_AI_API_KEY');
    const baseUrl = Deno.env.get('ONSPACE_AI_BASE_URL');

    if (!apiKey || !baseUrl) {
      return new Response(
        JSON.stringify({ error: 'OnSpace AI not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResponse = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `App idea: ${prompt.trim()}` },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error('OnSpace AI error:', errText);
      return new Response(
        JSON.stringify({ error: `AI error: ${errText}` }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content ?? '';

    // Parse the JSON from the AI response
    let plan: Record<string, unknown>;
    try {
      // Strip any accidental markdown code fences
      const cleaned = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      plan = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr, 'Raw content:', rawContent);
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI response', raw: rawContent }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ plan }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
