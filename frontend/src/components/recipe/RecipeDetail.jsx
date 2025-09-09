import React from 'react';
import { Clock, Users, ChefHat, Utensils, List } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecipeDetail = ({ recipe }) => {
  if (!recipe) return <div>Loading...</div>;

  const {
    _id,
    name,
    description,
    prepTime,
    cookTime,
    servings,
    difficulty,
    cuisine,
    ingredients,
    steps,
    image,
  } = recipe;

  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={image || 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'}
              alt={name}
              className="h-64 md:h-full w-full object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-neutral-800">{name}</h1>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  difficultyColor[difficulty]
                }`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            </div>
            
            {cuisine && (
              <p className="text-neutral-600 mt-1">Cuisine: {cuisine}</p>
            )}
            
            <p className="mt-4 text-neutral-700">{description}</p>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center">
                <Clock className="text-primary-500 mr-2" size={20} />
                <div>
                  <p className="text-sm text-neutral-500">Prep Time</p>
                  <p className="font-medium">{prepTime} min</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Utensils className="text-primary-500 mr-2" size={20} />
                <div>
                  <p className="text-sm text-neutral-500">Cook Time</p>
                  <p className="font-medium">{cookTime} min</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="text-primary-500 mr-2" size={20} />
                <div>
                  <p className="text-sm text-neutral-500">Servings</p>
                  <p className="font-medium">{servings}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link
                to={`/cooking/${_id}`}
                className="btn-primary inline-flex items-center"
              >
                <ChefHat size={20} className="mr-2" />
                Start Cooking with Voice Guide
              </Link>
            </div>
          </div>
        </div>
        
        <div className="p-6 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <List size={20} className="text-primary-500 mr-2" />
              Ingredients
            </h2>
            <ul className="space-y-2">
              {ingredients?.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mt-1.5 mr-2"></span>
                  <span>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Utensils size={20} className="text-primary-500 mr-2" />
              Instructions
            </h2>
            <ol className="space-y-4">
              {steps?.map((step, index) => (
                <li key={index} className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <p className="text-neutral-800">{step.instruction}</p>
                    {step.duration > 0 && (
                      <p className="text-sm text-neutral-500 mt-1">
                        Approximately {Math.round(step.duration / 60)} minutes
                      </p>
                    )}
                    {step.tips && (
                      <p className="text-sm text-secondary-600 italic mt-1">
                        Tip: {step.tips}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;