import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { Meal, MealPlanState } from '../../types/meal';

const initialState: MealPlanState = {
  meals: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchMeals = createAsyncThunk(
  'mealPlan/fetchMeals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/meals');
      return response.data.data.meals;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch meals');
    }
  }
);

export const addMeal = createAsyncThunk(
  'mealPlan/addMeal',
  async (meal: Omit<Meal, '_id'>, { rejectWithValue }) => {
    try {
      const response = await api.post('/meals', meal);
      return response.data.data.meal;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add meal');
    }
  }
);

export const updateMeal = createAsyncThunk(
  'mealPlan/updateMeal',
  async ({ _id, meal }: { _id: string; meal: Partial<Meal> }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/meals/${_id}`, meal);
      return response.data.data.meal;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update meal');
    }
  }
);

export const deleteMeal = createAsyncThunk(
  'mealPlan/deleteMeal',
  async (_id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/meals/${_id}`);
      return _id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete meal');
    }
  }
);

const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch meals
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action: PayloadAction<Meal[]>) => {
        state.loading = false;
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add meal
      .addCase(addMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMeal.fulfilled, (state, action: PayloadAction<Meal>) => {
        state.loading = false;
        state.meals.push(action.payload);
      })
      .addCase(addMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update meal
      .addCase(updateMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMeal.fulfilled, (state, action: PayloadAction<Meal>) => {
        state.loading = false;
        const index = state.meals.findIndex(meal => meal._id === action.payload._id);
        if (index !== -1) {
          state.meals[index] = action.payload;
        }
      })
      .addCase(updateMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete meal
      .addCase(deleteMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMeal.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.meals = state.meals.filter(meal => meal._id !== action.payload);
      })
      .addCase(deleteMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = mealPlanSlice.actions;
export default mealPlanSlice.reducer; 