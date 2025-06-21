import { Request, Response } from 'express';
import { Meal } from '../models/Meal';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';

// Get all meals for the authenticated user
export const getMeals = catchAsync(async (req: Request, res: Response) => {
  const meals = await Meal.find({ user: req.user._id });
  
  // Add default date for meals that don't have one (for backward compatibility)
  const mealsWithDate = meals.map(meal => {
    const mealObj = meal.toObject();
    if (!mealObj.date) {
      mealObj.date = mealObj.createdAt;
    }
    return mealObj;
  });

  res.status(200).json({
    status: 'success',
    data: {
      meals: mealsWithDate,
    },
  });
});

// Get a single meal by ID
export const getMeal = catchAsync(async (req: Request, res: Response) => {
  const meal = await Meal.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!meal) {
    throw new AppError('No meal found with that ID', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      meal,
    },
  });
});

// Create a new meal
export const createMeal = catchAsync(async (req: Request, res: Response) => {
  const meal = await Meal.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      meal,
    },
  });
});

// Update a meal
export const updateMeal = catchAsync(async (req: Request, res: Response) => {
  const meal = await Meal.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!meal) {
    throw new AppError('No meal found with that ID', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      meal,
    },
  });
});

// Delete a meal
export const deleteMeal = catchAsync(async (req: Request, res: Response) => {
  const meal = await Meal.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!meal) {
    throw new AppError('No meal found with that ID', 404);
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
}); 