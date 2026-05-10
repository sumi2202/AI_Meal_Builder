import React from 'react';
import { Meal } from '../types';
import MacroTracker from './MacroTracker';

interface MealCardProps {
  meal: Meal;
  onSaveMeal: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onSaveMeal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{meal.name}</h3>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Ingredients:</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {meal.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Instructions:</h4>
        <ol className="list-decimal list-inside space-y-1 text-gray-600">
          {(meal.instructions ?? []).map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>

      <div className="mb-6">
        <MacroTracker macro={meal.macros} />
      </div>

      <button
        onClick={onSaveMeal}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        Save Meal
      </button>
    </div>
  );
};

export default MealCard;