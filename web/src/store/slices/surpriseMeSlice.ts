import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { Meal } from '../../types/meal';

interface RecipePreference {
  dietaryRestrictions: string[];
  preferredCuisines: string[];
  spiceLevel: 'mild' | 'medium' | 'spicy';
  cookingTime: number;
  mealTypes: string[];
  seasonalPreferences: string[];
}

interface SurpriseMeState {
  preferences: RecipePreference | null;
  randomRecipes: Meal[];
  loading: boolean;
  error: string | null;
}

const initialState: SurpriseMeState = {
  preferences: null,
  randomRecipes: [],
  loading: false,
  error: null,
};

export const getPreferences = createAsyncThunk(
  'surpriseMe/getPreferences',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/surprise-me/preferences');
      return response.data.data.preferences;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get preferences');
    }
  }
);

export const updatePreferences = createAsyncThunk(
  'surpriseMe/updatePreferences',
  async (preferences: Partial<RecipePreference>, { rejectWithValue }) => {
    try {
      const response = await api.patch('/surprise-me/preferences', preferences);
      return response.data.data.preferences;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update preferences');
    }
  }
);

export const getRandomRecipes = createAsyncThunk(
  'surpriseMe/getRandomRecipes',
  async (count: number = 3, { rejectWithValue }) => {
    try {
      const response = await api.get(`/surprise-me/random-multiple?count=${count}`);
      return response.data.data.recipes;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get random recipes');
    }
  }
);

const surpriseMeSlice = createSlice({
  name: 'surpriseMe',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Preferences
      .addCase(getPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      .addCase(getPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Preferences
      .addCase(updatePreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      .addCase(updatePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Random Recipes
      .addCase(getRandomRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRandomRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.randomRecipes = action.payload;
      })
      .addCase(getRandomRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = surpriseMeSlice.actions;
export default surpriseMeSlice.reducer; 