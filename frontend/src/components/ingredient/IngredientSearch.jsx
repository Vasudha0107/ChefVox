import React, { useState } from 'react';
import { Search, X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const IngredientSearch = ({ onSearchResults }) => {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addIngredient = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !ingredients.includes(trimmedValue)) {
      setIngredients([...ingredients, trimmedValue]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const removeIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter((i) => i !== ingredientToRemove));
  };

  const searchRecipes = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/recipes/by-ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error('Failed to search recipes');
      }

      const data = await response.json();
      onSearchResults(data);
    } catch (err) {
      console.error('Error searching recipes:', err);
      setError('Failed to search recipes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold mb-6">Find Recipes by Ingredients</h2>
      
      <div className="mb-6">
        <div className="flex">
          <div className="relative flex-grow">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter an ingredient"
              className="input pr-10"
            />
            {inputValue && (
              <button
                onClick={() => setInputValue('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={addIngredient}
            disabled={!inputValue.trim()}
            className="ml-2 btn-secondary flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Add
          </button>
        </div>
        
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        
        <div className="mt-4">
          <p className="text-sm text-neutral-500 mb-2">Your ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {ingredients.length === 0 ? (
              <p className="text-neutral-400 italic">No ingredients added yet</p>
            ) : (
              ingredients.map((ingredient) => (
                <motion.div
                  key={ingredient}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-secondary-100 text-secondary-800 px-3 py-1.5 rounded-full flex items-center text-sm"
                >
                  {ingredient}
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="ml-2 text-secondary-500 hover:text-secondary-700"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <button
        onClick={searchRecipes}
        disabled={ingredients.length === 0 || isLoading}
        className="btn-primary w-full flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Searching...
          </>
        ) : (
          <>
            <Search size={18} className="mr-2" />
            Find Recipes
          </>
        )}
      </button>
    </div>
  );
};

export default IngredientSearch;