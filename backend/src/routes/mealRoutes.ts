import express from 'express';
import { protect } from '../middleware/auth';
import {
  getMeals,
  getMeal,
  createMeal,
  updateMeal,
  deleteMeal,
} from '../controllers/mealController';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router
  .route('/')
  .get(getMeals)
  .post(createMeal);

router
  .route('/:id')
  .get(getMeal)
  .patch(updateMeal)
  .delete(deleteMeal);

export default router; 