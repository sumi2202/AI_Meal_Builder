import React from 'react';
import { Meal } from '../types';
import MacroTracker from './MacroTracker';

interface MealCardProps {
  meal: Meal;
  onSaveMeal: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onSaveMeal }) => {
  return (
    <div className="bg-ivory-mist-50 rounded-lg shadow-md p-6 border border-powder-petal-200 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-2xl font-bold text-vintage-grape-900 mb-4">{meal.name}</h3>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-vintage-grape-900 mb-2">Ingredients:</h4>
        <ul className="list-disc list-inside space-y-1 text-vintage-grape-900">
          {meal.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-vintage-grape-900 mb-2">Instructions:</h4>
        <ol className="list-decimal list-inside space-y-1 text-vintage-grape-900">
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
        className="w-full bg-vintage-grape-600 hover:bg-vintage-grape-700 text-ivory-mist-50 font-semibold py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-vintage-grape-500 focus:ring-opacity-50"
      >
        Save Meal
      </button>
    </div>
  );
};

export default MealCard;