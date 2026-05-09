'use client';

import React, { useState, useEffect } from 'react';
import MealCard from '@/components/MealCard';
import { SavedPlan } from '@/types';

export default function SavedPage() {
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved plans from localStorage
    const existingPlans = localStorage.getItem('mealPlans');
    if (existingPlans) {
      try {
        const plans: SavedPlan[] = JSON.parse(existingPlans);
        setSavedPlans(plans);
      } catch (error) {
        console.error('Error parsing saved plans:', error);
      }
    }
    setMounted(true);
  }, []);

  const handleDeletePlan = (id: string) => {
    const updatedPlans = savedPlans.filter((plan) => plan.id !== id);
    setSavedPlans(updatedPlans);
    localStorage.setItem('mealPlans', JSON.stringify(updatedPlans));
    alert('Meal plan deleted successfully.');
  };

  const handleSaveMeal = (planId: string, mealIndex: number) => {
    alert(`Meal saved from plan ${planId}`);
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">Saved Meal Plans</h1>
          <p className="text-lg text-green-700">Your personalized PCOS-friendly meals</p>
        </div>

        {savedPlans.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center border-2 border-dashed border-purple-300">
            <svg
              className="w-16 h-16 mx-auto text-purple-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No saved plans yet</h3>
            <p className="text-gray-600 mb-4">
              Chat with your AI nutrition expert to create personalized meal plans
            </p>
            <a
              href="/chat"
              className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              Start Planning
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {savedPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{plan.mealName}</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      📅 {new Date(plan.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>

                {plan.meals.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {plan.meals.map((meal, index) => (
                      <div key={index}>
                        <MealCard
                          meal={meal}
                          onSaveMeal={() => handleSaveMeal(plan.id, index)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className="text-gray-600">No meals added to this plan yet</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}