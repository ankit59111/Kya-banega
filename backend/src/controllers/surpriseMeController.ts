import { Request, Response } from 'express';
import { RecipePreference } from '../models/RecipePreference';
import { Meal } from '../models/Meal';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';

// Get user's recipe preferences
export const getPreferences = catchAsync(async (req: Request, res: Response) => {
  const preferences = await RecipePreference.findOne({ user: req.user._id });

  if (!preferences) {
    // Return default preferences if none exist
    const defaultPreferences = {
      dietaryRestrictions: [],
      preferredCuisines: [],
      spiceLevel: 'medium',
      cookingTime: 30,
      mealTypes: ['breakfast', 'lunch', 'dinner', 'snack'],
      seasonalPreferences: []
    };
    
    res.status(200).json({
      status: 'success',
      data: {
        preferences: defaultPreferences,
      },
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      preferences,
    },
  });
});

// Update user's recipe preferences
export const updatePreferences = catchAsync(async (req: Request, res: Response) => {
  const preferences = await RecipePreference.findOneAndUpdate(
    { user: req.user._id },
    req.body,
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      preferences,
    },
  });
});

// Get a random recipe based on preferences
export const getRandomRecipe = catchAsync(async (req: Request, res: Response) => {
  const preferences = await RecipePreference.findOne({ user: req.user._id });

  // Build query - show meals from all users
  const query: any = {};

  if (preferences) {
    if (preferences.mealTypes && preferences.mealTypes.length > 0) {
      query.type = { $in: preferences.mealTypes };
    }

    // Only filter by cuisine if preferredCuisines exist and are not empty
    if (preferences.preferredCuisines && preferences.preferredCuisines.length > 0) {
      query.cuisine = { $in: preferences.preferredCuisines };
    }
  }

  // Get total count of matching recipes
  const count = await Meal.countDocuments(query);

  if (count === 0) {
    // If no meals match preferences, get any random meal
    const totalMeals = await Meal.countDocuments({});
    if (totalMeals === 0) {
      throw new AppError('No recipes found in the database.', 404);
    }
    
    const random = Math.floor(Math.random() * totalMeals);
    const recipe = await Meal.findOne({}).skip(random);
    
    res.status(200).json({
      status: 'success',
      data: {
        recipe,
      },
    });
    return;
  }

  // Get a random recipe
  const random = Math.floor(Math.random() * count);
  const recipe = await Meal.findOne(query).skip(random);

  res.status(200).json({
    status: 'success',
    data: {
      recipe,
    },
  });
});

// Get multiple random recipes
export const getRandomRecipes = catchAsync(async (req: Request, res: Response) => {
  const { count = 3 } = req.query;
  const preferences = await RecipePreference.findOne({ user: req.user._id });

  // Build query - show meals from all users
  const query: any = {};

  if (preferences) {
    if (preferences.mealTypes && preferences.mealTypes.length > 0) {
      query.type = { $in: preferences.mealTypes };
    }

    // Only filter by cuisine if preferredCuisines exist and match the cuisine field in meals
    if (preferences.preferredCuisines && preferences.preferredCuisines.length > 0) {
      query.cuisine = { $in: preferences.preferredCuisines };
    }
  }

  // Get random recipes
  const recipes = await Meal.aggregate([
    { $match: query },
    { $sample: { size: Number(count) } },
  ]);

  if (recipes.length === 0) {
    // If no meals match preferences, get any random meals
    const allRecipes = await Meal.aggregate([
      { $sample: { size: Number(count) } },
    ]);
    
    res.status(200).json({
      status: 'success',
      data: {
        recipes: allRecipes,
      },
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      recipes,
    },
  });
}); 