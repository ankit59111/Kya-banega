import express from 'express';
import { protect } from '../middleware/auth';
import {
  getPreferences,
  updatePreferences,
  getRandomRecipe,
  getRandomRecipes,
} from '../controllers/surpriseMeController';

const router = express.Router();

// Protect all routes
router.use(protect);

// Preference routes
router
  .route('/preferences')
  .get(getPreferences)
  .patch(updatePreferences);

// Random recipe routes
router.get('/random', getRandomRecipe);
router.get('/random-multiple', getRandomRecipes);

export default router; 