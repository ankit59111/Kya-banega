export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export interface MealTimeConfig {
  type: MealType;
  startHour: number;
  endHour: number;
  label: string;
  emoji: string;
  color: string;
}

export const MEAL_TIMES: MealTimeConfig[] = [
  {
    type: 'breakfast',
    startHour: 6,
    endHour: 11,
    label: 'Breakfast',
    emoji: '🌅',
    color: '#FF6B35'
  },
  {
    type: 'lunch',
    startHour: 11,
    endHour: 15,
    label: 'Lunch',
    emoji: '☀️',
    color: '#2E8B57'
  },
  {
    type: 'snack',
    startHour: 15,
    endHour: 18,
    label: 'Snacks',
    emoji: '🍎',
    color: '#FFD700'
  },
  {
    type: 'dinner',
    startHour: 18,
    endHour: 22,
    label: 'Dinner',
    emoji: '🌙',
    color: '#8B4513'
  }
];

/**
 * Get the current meal type based on the current time
 */
export const getCurrentMealType = (): MealType => {
  const now = new Date();
  const currentHour = now.getHours();
  
  for (const mealTime of MEAL_TIMES) {
    if (currentHour >= mealTime.startHour && currentHour < mealTime.endHour) {
      return mealTime.type;
    }
  }
  
  // Default to dinner if outside meal times
  return 'dinner';
};

/**
 * Get meal configuration for a specific meal type
 */
export const getMealConfig = (mealType: MealType): MealTimeConfig => {
  const config = MEAL_TIMES.find(meal => meal.type === mealType);
  if (!config) {
    throw new Error(`Invalid meal type: ${mealType}`);
  }
  return config;
};

/**
 * Get current meal configuration
 */
export const getCurrentMealConfig = (): MealTimeConfig => {
  const currentMealType = getCurrentMealType();
  return getMealConfig(currentMealType);
};

/**
 * Check if it's meal time (within meal hours)
 */
export const isMealTime = (): boolean => {
  const now = new Date();
  const currentHour = now.getHours();
  
  return MEAL_TIMES.some(meal => 
    currentHour >= meal.startHour && currentHour < meal.endHour
  );
};

/**
 * Get next meal time
 */
export const getNextMealTime = (): MealTimeConfig | null => {
  const now = new Date();
  const currentHour = now.getHours();
  
  const nextMeal = MEAL_TIMES.find(meal => meal.startHour > currentHour);
  return nextMeal || null;
};

/**
 * Format time for display
 */
export const formatTime = (date: Date = new Date()): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Get greeting based on meal time
 */
export const getMealGreeting = (): string => {
  const config = getCurrentMealConfig();
  const time = formatTime();
  
  return `${config.emoji} Time for ${config.label}! (${time})`;
}; 