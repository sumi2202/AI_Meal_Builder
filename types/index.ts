export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Macro {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  name: string;
  ingredients: string[];
  instructions: string[];
  macros: Macro;
}

export interface SavedPlan {
  id: string;
  date: string;
  mealName: string;
  meals: Meal[];
}