import React, { useState } from 'react';
import IngredientSearch from '../components/ingredient/IngredientSearch';
import RecipeCard from '../components/recipe/RecipeCard';

const IngredientSearchPage = () => {
  const [searchResults, setSearchResults] = useState(null);
  
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Recipes by Ingredients</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <IngredientSearch onSearchResults={handleSearchResults} />
          
          {/* Tips section */}
          <div className="mt-8 bg-primary-50 rounded-xl p-6 border border-primary-100">
            <h3 className="text-lg font-semibold mb-4 text-primary-800">Tips for Ingredient Search</h3>
            <ul className="space-y-3 text-primary-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mt-1.5 mr-2"></span>
                Be specific with ingredients (e.g., "chicken breast\" instead of just "chicken")
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mt-1.5 mr-2"></span>
                Add staple ingredients you always have (salt, pepper, oil)
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mt-1.5 mr-2"></span>
                The more ingredients you add, the more specific the results
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mt-1.5 mr-2"></span>
                Results are sorted by best match first
              </li>
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {searchResults === null ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <img 
                src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"
                alt="Food ingredients"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h2 className="text-2xl font-semibold mb-4">What's in your kitchen?</h2>
              <p className="text-neutral-600 mb-4">
                Add ingredients you have on hand, and we'll find recipes you can make right now.
              </p>
              <p className="text-neutral-500 text-sm">
                Start by adding ingredients to the search panel on the left.
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">No Matching Recipes Found</h2>
              <p className="text-neutral-600 mb-4">
                We couldn't find any recipes with the ingredients you specified.
              </p>
              <p className="text-neutral-500">
                Try adding more common ingredients or using more general terms.
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Found {searchResults.length} {searchResults.length === 1 ? 'recipe' : 'recipes'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.map(recipe => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientSearchPage;