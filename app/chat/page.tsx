'use client';

import React, { useState, useCallback } from 'react';
import ChatWindow from '@/components/ChatWindow';
import { callGroq, extractRecipeFromChat } from '@/lib/groq';
import { Message, Meal, SavedPlan } from '@/types';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (userMessage: string) => {
    // Add user message to chat
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Call Groq API
      const assistantReply = await callGroq(messages, userMessage);

      // Add assistant response to chat
      const assistantMessage: Message = {
        role: 'assistant',
        content: assistantReply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Groq API:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const handleSavePlan = async () => {
    if (messages.length === 0) {
      alert('Please chat first to create a meal plan.');
      return;
    }

    setIsLoading(true);
    try {
      const recipes = await extractRecipeFromChat(messages);

      if (!recipes.length) {
        alert('No recipes found in this conversation yet');
        return;
      }

      const meals: Meal[] = recipes.map((recipe) => ({
        name: recipe.mealName,
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
        macros: {
          calories: Number(recipe.macros?.calories ?? 0),
          protein: Number(recipe.macros?.protein ?? 0),
          carbs: Number(recipe.macros?.carbs ?? 0),
          fat: Number(recipe.macros?.fat ?? 0),
        },
      }));

      const planName = recipes[0]?.mealName || 'Meal Plan';
      const id = `plan_${Date.now()}`;
      const date = new Date().toISOString(); 

      const savedPlan: SavedPlan = {
        id,
        date,
        mealName: planName,
        meals,
      };

      const existingPlans = localStorage.getItem('mealPlans');
      const plans: SavedPlan[] = existingPlans ? JSON.parse(existingPlans) : [];
      plans.push(savedPlan);
      localStorage.setItem('mealPlans', JSON.stringify(plans));

      const mealNames = meals.map((meal) => meal.name).join(', ');
      alert(`✓ Meal plan saved successfully for: ${mealNames}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-ivory-mist-50 to-jungle-teal-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-vintage-grape-900 mb-2">Chef C</h1>
          <p className="text-lg text-vintage-grape-700">Chat with your AI nutrition expert</p>
        </div>

        <div className="bg-pink-mist-50 border border-pink-mist-200 text-pink-mist-900 rounded-xl p-4 mb-4">
          <p className="text-sm leading-6">
            ⚠️ This AI is for informational purposes only and is not a substitute for professional medical or dietary advice. Always consult your doctor or registered dietitian before making changes to your diet.
          </p>
        </div>

        <div className="bg-ivory-mist-50 rounded-lg shadow-lg p-4 mb-6 h-96">
          <ChatWindow
            messages={messages}
            onSend={handleSendMessage}
            isLoading={isLoading}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSavePlan}
            disabled={messages.length === 0 || isLoading}
            className="px-8 py-3 bg-jungle-teal-600 text-ivory-mist-50 font-semibold rounded-lg hover:bg-jungle-teal-700 focus:outline-none focus:ring-2 focus:ring-jungle-teal-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Save Meal Plan
          </button>
        </div>
      </div>
    </div>
  );
}