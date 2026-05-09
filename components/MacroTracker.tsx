import React from 'react';
import { Macro } from '../types';

interface MacroTrackerProps {
  macro: Macro;
}

const MacroTracker: React.FC<MacroTrackerProps> = ({ macro }) => {
  return (
    <div className="bg-linear-to-br from-purple-50 to-green-50 p-6 rounded-xl shadow-lg border border-purple-100">
      <h3 className="text-xl font-semibold text-purple-800 mb-4 text-center">Nutritional Macros</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-200">
          <p className="text-sm font-medium text-purple-600 uppercase tracking-wide">Calories</p>
          <p className="text-2xl font-bold text-purple-800">{macro.calories}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-200">
          <p className="text-sm font-medium text-green-600 uppercase tracking-wide">Protein</p>
          <p className="text-2xl font-bold text-green-800">{macro.protein}g</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-200">
          <p className="text-sm font-medium text-purple-600 uppercase tracking-wide">Carbs</p>
          <p className="text-2xl font-bold text-purple-800">{macro.carbs}g</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-200">
          <p className="text-sm font-medium text-green-600 uppercase tracking-wide">Fat</p>
          <p className="text-2xl font-bold text-green-800">{macro.fat}g</p>
        </div>
      </div>
    </div>
  );
};

export default MacroTracker;