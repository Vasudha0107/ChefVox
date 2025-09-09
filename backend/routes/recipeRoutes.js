import express from 'express';
import {
  getRecipes,
  getRecipeById,
  getRecipesByIngredients
} from '../controllers/recipeController.js';

const router = express.Router();

router.route('/').get(getRecipes);
router.route('/by-ingredients').post(getRecipesByIngredients);
router.route('/:id').get(getRecipeById);

export default router;