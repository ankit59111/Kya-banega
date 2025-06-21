import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';

export interface RecipePreference {
  _id?: string;
  dietaryRestrictions: string[];
  preferredCuisines: string[];
  spiceLevel: 'mild' | 'medium' | 'hot';
  cookingTime: {
    min: number;
    max: number;
  };
  mealTypes: ('breakfast' | 'lunch' | 'dinner' | 'snack')[];
  seasonalPreferences: boolean;
}

interface PreferencesState {
  preferences: RecipePreference | null;
  loading: boolean;
  error: string | null;
}

const initialState: PreferencesState = {
  preferences: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchPreferences = createAsyncThunk(
  'preferences/fetchPreferences',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/surprise-me/preferences');
      return response.data.data.preferences;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch preferences');
    }
  }
);

export const updatePreferences = createAsyncThunk(
  'preferences/updatePreferences',
  async (preferences: Partial<RecipePreference>, { rejectWithValue }) => {
    try {
      const response = await api.patch('/surprise-me/preferences', preferences);
      return response.data.data.preferences;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update preferences');
    }
  }
);

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch preferences
      .addCase(fetchPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreferences.fulfilled, (state, action: PayloadAction<RecipePreference>) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      .addCase(fetchPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update preferences
      .addCase(updatePreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePreferences.fulfilled, (state, action: PayloadAction<RecipePreference>) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      .addCase(updatePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = preferencesSlice.actions;
export default preferencesSlice.reducer; 