import { Message } from '../types';

const SYSTEM_PROMPT = `You are a PCOS and diabetes nutrition expert and health assistant. 

You have two modes:
1. HEALTH QUESTION: If the user asks a general health, symptom, or nutrition question (e.g. "what is gut motility", "why do I feel sick after eating X"), answer it clearly and concisely first. Only suggest a related meal or recipe at the end if it's genuinely relevant.

2. MEAL REQUEST: If the user asks for a meal, recipe, or food suggestion, respond with:
   - Meal name
   - Ingredients list
   - Step-by-step instructions
   - Estimated macros (calories, protein, carbs, fat)
   - Why it's beneficial for PCOS/diabetes

Always prioritize answering what was actually asked before offering food suggestions.`;
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