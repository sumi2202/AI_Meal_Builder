import React from 'react';
import { Macro } from '../types';

interface MacroTrackerProps {
  macro: Macro;
}

const MacroTracker: React.FC<MacroTrackerProps> = ({ macro }) => {
  return (
    <div className="bg-linear-to-br from-ivory-mist-50 to-jungle-teal-50 p-6 rounded-xl shadow-lg border border-powder-petal-100">
      <h3 className="text-xl font-semibold text-vintage-grape-800 mb-4 text-center">Nutritional Macros</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-ivory-mist-50 p-4 rounded-lg shadow-sm border border-powder-petal-200">
          <p className="text-sm font-medium text-vintage-grape-600 uppercase tracking-wide">Calories</p>
          <p className="text-2xl font-bold text-vintage-grape-800">{macro.calories}</p>
        </div>
        <div className="bg-ivory-mist-50 p-4 rounded-lg shadow-sm border border-jungle-teal-200">
          <p className="text-sm font-medium text-jungle-teal-600 uppercase tracking-wide">Protein</p>
          <p className="text-2xl font-bold text-jungle-teal-800">{macro.protein}g</p>
        </div>
        <div className="bg-ivory-mist-50 p-4 rounded-lg shadow-sm border border-powder-petal-200">
          <p className="text-sm font-medium text-vintage-grape-600 uppercase tracking-wide">Carbs</p>
          <p className="text-2xl font-bold text-vintage-grape-800">{macro.carbs}g</p>
        </div>
        <div className="bg-ivory-mist-50 p-4 rounded-lg shadow-sm border border-jungle-teal-200">
          <p className="text-sm font-medium text-jungle-teal-600 uppercase tracking-wide">Fat</p>
          <p className="text-2xl font-bold text-jungle-teal-800">{macro.fat}g</p>
        </div>
      </div>
    </div>
  );
};

export default MacroTracker;