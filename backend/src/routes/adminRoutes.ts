import express from 'express';
import { User } from '../models/User';
import { Meal } from '../models/Meal';
import { RecipePreference } from '../models/RecipePreference';

const router = express.Router();

// Get all users
router.get('/users', async (_req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    const user = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete associated meals and preferences first
    await Meal.deleteMany({ user: id });
    await RecipePreference.deleteMany({ user: id });
    
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

// Get all meals
router.get('/meals', async (_req, res) => {
  try {
    const meals = await Meal.find({}).populate('user', 'name email');
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meals', error });
  }
});

// Update meal
router.put('/meals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const meal = await Meal.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('user', 'name email');
    
    if (!meal) {
      res.status(404).json({ message: 'Meal not found' });
      return;
    }
    
    res.json(meal);
  } catch (error) {
    res.status(500).json({ message: 'Error updating meal', error });
  }
});

// Delete meal
router.delete('/meals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const meal = await Meal.findByIdAndDelete(id);
    
    if (!meal) {
      res.status(404).json({ message: 'Meal not found' });
      return;
    }
    
    res.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meal', error });
  }
});

// Get all recipe preferences
router.get('/preferences', async (_req, res) => {
  try {
    const preferences = await RecipePreference.find({}).populate('user', 'name email');
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching preferences', error });
  }
});

// Update recipe preference
router.put('/preferences/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const preference = await RecipePreference.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('user', 'name email');
    
    if (!preference) {
      res.status(404).json({ message: 'Preference not found' });
      return;
    }
    
    res.json(preference);
  } catch (error) {
    res.status(500).json({ message: 'Error updating preference', error });
  }
});

// Delete recipe preference
router.delete('/preferences/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const preference = await RecipePreference.findByIdAndDelete(id);
    
    if (!preference) {
      res.status(404).json({ message: 'Preference not found' });
      return;
    }
    
    res.json({ message: 'Preference deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting preference', error });
  }
});

// Get database statistics
router.get('/stats', async (_req, res) => {
  try {
    const userCount = await User.countDocuments();
    const mealCount = await Meal.countDocuments();
    const preferenceCount = await RecipePreference.countDocuments();
    
    res.json({
      users: userCount,
      meals: mealCount,
      preferences: preferenceCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
});

export default router; 