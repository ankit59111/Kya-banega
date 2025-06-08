import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
}

interface MealPlanState {
  meals: Meal[];
  loading: boolean;
  error: string | null;
}

const initialState: MealPlanState = {
  meals: [],
  loading: false,
  error: null,
};

const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState,
  reducers: {
    setMeals: (state, action: PayloadAction<Meal[]>) => {
      state.meals = action.payload;
    },
    addMeal: (state, action: PayloadAction<Meal>) => {
      state.meals.push(action.payload);
    },
    removeMeal: (state, action: PayloadAction<string>) => {
      state.meals = state.meals.filter(meal => meal.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setMeals, addMeal, removeMeal, setLoading, setError } = mealPlanSlice.actions;
export default mealPlanSlice.reducer; 