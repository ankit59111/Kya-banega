export interface Meal {
  _id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  cuisine: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string;
  imageUrl?: string;
  user: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface MealPlanState {
  meals: Meal[];
  loading: boolean;
  error: string | null;
} 