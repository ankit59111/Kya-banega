import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import mealPlanReducer from './slices/mealPlanSlice';
import surpriseMeReducer from './slices/surpriseMeSlice';
import preferencesReducer from './slices/preferencesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mealPlan: mealPlanReducer,
    surpriseMe: surpriseMeReducer,
    preferences: preferencesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 