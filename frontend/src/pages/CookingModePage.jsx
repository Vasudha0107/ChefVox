import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CookingInterface from '../components/cooking/CookingInterface';
import { ArrowLeft, Loader } from 'lucide-react';

const CookingModePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        
        if (!response.ok) {
          throw new Error('Recipe not found');
        }
        
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to load recipe. It may not exist or there was a server error.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecipe();
  }, [id]);
  
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
            onClick={() => navigate('/recipes')}
            className="mt-4 btn-primary"
          >
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => navigate(`/recipes/${id}`)}
          className="flex items-center text-neutral-600 hover:text-primary-500 mb-4"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back to Recipe
        </button>
      </div>
      
      <CookingInterface recipe={recipe} />
    </div>
  );
};

export default CookingModePage;