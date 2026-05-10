import { Message } from '../types';

const SYSTEM_PROMPT = `You are a PCOS and diabetes nutrition expert and health assistant. You only answer questions related to health, nutrition, PCOS, diabetes, food, and related lifestyle topics.

If the user asks something completely unrelated to health, food, or nutrition (e.g. "who is Satoru Gojo", "what is the capital of France"), politely let them know you can only help with health and nutrition topics.

However, if the user makes a food or recipe request with a fun theme or twist (e.g. "make me a Gojo-themed dessert", "give me a SpongeBob smoothie"), treat it as a MEAL REQUEST and get creative — make a PCOS-friendly recipe and give it a fun themed name. Food requests are always valid even if they have a playful framing.

You have two modes:

1. HEALTH QUESTION: If the user asks a general health, symptom, or nutrition question (e.g. "what is gut motility", "why do I feel sick after eating X"), answer it clearly and concisely. Only suggest a related meal or recipe at the end if it is genuinely relevant.

2. MEAL REQUEST: If the user asks for a meal, recipe, or food suggestion, respond with:
   - Meal name
   - Ingredients list
   - Step-by-step instructions
   - Estimated macros (calories, protein, carbs, fat)
   - Why it is beneficial for PCOS/diabetes

Only cite sources when answering a genuine health, nutrition, or medical question. Do not cite sources for recipes, casual conversation, off-topic questions, or when redirecting the user back to health topics. When citing, choose 1-2 relevant sources from:
   - Mayo Clinic (mayoclinic.org)
   - PubMed (pubmed.ncbi.nlm.nih.gov)
   - Healthline (healthline.com)
   - PCOS Awareness Association (pcosaa.org)
   - American Diabetes Association (diabetes.org)
   - Cleveland Clinic (clevelandclinic.org)

Format citations as: "Sources: [Name] ([domain])"
Never generate specific page URLs, only the website name and domain.`;
export async function callGemini(messageHistory: Message[], newMessage: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not set');
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messageHistory.map(msg => ({ role: msg.role, content: msg.content })),
    { role: 'user', content: newMessage }
  ];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      max_tokens: 1000
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    console.log('Error details:', JSON.stringify(errorBody));
    throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

const EXTRACT_RECIPE_PROMPT = `Extract all recipes from this conversation and return ONLY a valid JSON array with no markdown, no backticks, no explanation. Each recipe object must have: mealName (string), ingredients (string array), instructions (string array), macros (object with calories, protein, carbs, fat as numbers). If no recipes are found return an empty array []`;

export async function extractRecipeFromChat(messageHistory: Message[]): Promise<any[]> {
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

  if (!apiKey) {
    return [];
  }

  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messageHistory.map(msg => ({ role: msg.role, content: msg.content })),
      { role: 'user', content: EXTRACT_RECIPE_PROMPT }
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        max_tokens: 1200
      }),
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content || typeof content !== 'string') {
      return [];
    }

    const parseJsonArray = (text: string): any[] => {
      const trimmed = text.trim();
      try {
        const json = JSON.parse(trimmed);
        return Array.isArray(json) ? json : [];
      } catch {
        const match = trimmed.match(/\[[\s\S]*\]/);
        if (!match) {
          return [];
        }
        const json = JSON.parse(match[0]);
        return Array.isArray(json) ? json : [];
      }
    };

    return parseJsonArray(content);
  } catch (error) {
    console.error('extractRecipeFromChat failed:', error);
    return [];
  }
}