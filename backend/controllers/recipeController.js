import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';

// @desc    Fetch all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({});
  res.json(recipes);
});

// @desc    Fetch single recipe
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404);
    throw new Error('Recipe not found');
  }
});

// @desc    Find recipes by ingredients
// @route   POST /api/recipes/by-ingredients
// @access  Public
const getRecipesByIngredients = asyncHandler(async (req, res) => {
  const { ingredients } = req.body;
  
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    res.status(400);
    throw new Error('Please provide a list of ingredients');
  }

  // Find recipes that contain the provided ingredients
  const recipes = await Recipe.find({
    'ingredients.name': { $in: ingredients.map(ing => new RegExp(ing, 'i')) }
  });

  // Sort recipes by how many of the requested ingredients they contain
  const sortedRecipes = recipes.map(recipe => {
    const matchCount = recipe.ingredients.filter(recipeIng => 
      ingredients.some(ing => recipeIng.name.toLowerCase().includes(ing.toLowerCase()))
    ).length;
    
    const matchPercentage = (matchCount / recipe.ingredients.length) * 100;
    
    return {
      ...recipe.toObject(),
      matchPercentage,
      matchCount
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  res.json(sortedRecipes);
});

export { getRecipes, getRecipeById, getRecipesByIngredients };