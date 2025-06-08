import { configureStore } from '@reduxjs/toolkit';
import mealPlanReducer from './slices/mealPlanSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    mealPlan: mealPlanReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 