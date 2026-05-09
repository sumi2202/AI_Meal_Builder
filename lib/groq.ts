import { Message } from '../types';

const SYSTEM_PROMPT = "You are a PCOS and diabetes nutrition expert. Suggest PCOS and diabetes-friendly meals with anti-inflammatory ingredients. For every meal always include: meal name, ingredients list, and estimated macros (calories, protein, carbs, fat).";

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