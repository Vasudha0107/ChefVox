import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/recipe/RecipeCard';
import { Search, Filter, Loader } from 'lucide-react';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    difficulty: '',
    cuisine: '',
  });
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        
        const data = await response.json();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecipes();
  }, []);
  
  useEffect(() => {
    // Apply search and filters
    let results = recipes;
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        recipe => 
          recipe.name.toLowerCase().includes(term) || 
          recipe.description.toLowerCase().includes(term) ||
          recipe.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Apply difficulty filter
    if (filters.difficulty) {
      results = results.filter(recipe => recipe.difficulty === filters.difficulty);
    }
    
    // Apply cuisine filter
    if (filters.cuisine) {
      results = results.filter(recipe => recipe.cuisine === filters.cuisine);
    }
    
    setFilteredRecipes(results);
  }, [searchTerm, filters, recipes]);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      difficulty: '',
      cuisine: ''
    });
  };
  
  // Extract unique cuisines for filter options
  const cuisines = [...new Set(recipes.map(recipe => recipe.cuisine).filter(Boolean))];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size={40} className="text-primary-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg inline-block">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Recipes</h1>
      
      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-neutral-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search recipes, ingredients, or tags..."
              className="input pl-10"
            />
          </div>
          
          <div className="flex gap-4 flex-wrap md:flex-nowrap">
            <div className="flex items-center min-w-[180px]">
              <Filter size={18} className="text-neutral-400 mr-2" />
              <select
                name="difficulty"
                value={filters.difficulty}
                onChange={handleFilterChange}
                className="input py-1.5"
              >
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            {cuisines.length > 0 && (
              <div className="flex items-center min-w-[180px]">
                <Filter size={18} className="text-neutral-400 mr-2" />
                <select
                  name="cuisine"
                  value={filters.cuisine}
                  onChange={handleFilterChange}
                  className="input py-1.5"
                >
                  <option value="">All Cuisines</option>
                  {cuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <button
              onClick={clearFilters}
              className="btn-outline py-1.5"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Results */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-neutral-500 mb-4">No recipes found matching your criteria</p>
          <button
            onClick={clearFilters}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <p className="mb-6 text-neutral-500">
            Showing {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
// console.log('Fetched recipes:', data);

export default RecipesPage;