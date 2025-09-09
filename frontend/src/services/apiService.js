import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Recipe related API calls
export const recipeApi = {
  // Get all recipes
  getRecipes: async () => {
    try {
      const response = await api.get('/recipes');
      return response.data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },

  // Get single recipe by ID
  getRecipeById: async (id) => {
    try {
      const response = await api.get(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching recipe with id ${id}:`, error);
      throw error;
    }
  },

  // Search recipes by ingredients
  getRecipesByIngredients: async (ingredients) => {
    try {
      const response = await api.post('/recipes/by-ingredients', { ingredients });
      return response.data;
    } catch (error) {
      console.error('Error searching recipes by ingredients:', error);
      throw error;
    }
  },
};

// OpenAI API related calls
export const openaiApi = {
  // Transcribe audio to text
  transcribeAudio: async (audioData) => {
    try {
      const response = await api.post('/openai/transcribe', { audioData });
      return response.data;
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw error;
    }
  },

  // Get cooking assistance from ChatGPT
  getCookingAssistance: async (query, recipeContext) => {
    try {
      const response = await api.post('/openai/cooking-assistance', {
        query,
        recipeContext,
      });
      return response.data;
    } catch (error) {
      console.error('Error getting cooking assistance:', error);
      throw error;
    }
  },
};

export default {
  recipe: recipeApi,
  openai: openaiApi,
};