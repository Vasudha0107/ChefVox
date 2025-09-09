// import React from 'react';
// import { Clock, Users, ChefHat } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const RecipeCard = ({ recipe }) => {
//   const { _id, name, description, prepTime, cookTime, servings, difficulty, image } = recipe;

//   const difficultyColor = {
//     easy: 'bg-green-100 text-green-800',
//     medium: 'bg-yellow-100 text-yellow-800',
//     hard: 'bg-red-100 text-red-800',
//   };

//   return (
//     <motion.div
//       whileHover={{ y: -5, transition: { duration: 0.2 } }}
//       className="card overflow-hidden"
//     >
//       <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
//         {/* <img
//           src={image || 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'}
//           alt={name}
//           className="w-full h-full object-cover"
//         /> */}
//         <img
//           src={`/proxy-image?url=${encodeURIComponent(recipe.image)}`}
//           alt={name}
//           className="w-full h-48 object-cover rounded-t-2xl"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg"; // fallback
//           }}
//         />



//         <div className="absolute top-3 right-3">
//           <span
//             className={`text-xs font-medium px-2 py-1 rounded-full ${
//               difficultyColor[difficulty]
//             }`}
//           >
//             {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
//           </span>
//         </div>
//       </div>

//       <h3 className="text-xl font-semibold mb-2">{name}</h3>
//       <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{description}</p>

//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center text-sm text-neutral-500">
//           <Clock size={16} className="mr-1" />
//           <span>{prepTime + cookTime} min</span>
//         </div>
//         <div className="flex items-center text-sm text-neutral-500">
//           <Users size={16} className="mr-1" />
//           <span>{servings} servings</span>
//         </div>
//       </div>

//       <div className="flex justify-between items-center">
//         <Link
//           to={`/recipes/${_id}`}
//           className="text-primary-500 font-medium hover:text-primary-600 text-sm"
//         >
//           View Recipe
//         </Link>
//         <Link
//           to={`/cooking/${_id}`}
//           className="btn-primary flex items-center text-sm py-1.5"
//         >
//           <ChefHat size={16} className="mr-1.5" /> Start Cooking
//         </Link>
//       </div>
//     </motion.div>
//   );
// };

// export default RecipeCard;

import React from 'react';
import { Clock, Users, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RecipeCard = ({ recipe }) => {
  const { _id, name, description, prepTime, cookTime, servings, difficulty, image } = recipe;

  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  // ✅ Fix: compute imgSrc here, not inside JSX
  

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="card overflow-hidden"
    >
      <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
        <img
          src={recipe.image || "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg"}
          alt={recipe.name}
          className="w-full h-48 object-cover rounded-t-2xl"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg";
          }}
        />


        <div className="absolute top-3 right-3">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              difficultyColor[difficulty]
            }`}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{description}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-sm text-neutral-500">
          <Clock size={16} className="mr-1" />
          <span>{prepTime + cookTime} min</span>
        </div>
        <div className="flex items-center text-sm text-neutral-500">
          <Users size={16} className="mr-1" />
          <span>{servings} servings</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Link
          to={`/recipes/${_id}`}
          className="text-primary-500 font-medium hover:text-primary-600 text-sm"
        >
          View Recipe
        </Link>
        <Link
          to={`/cooking/${_id}`}
          className="btn-primary flex items-center text-sm py-1.5"
        >
          <ChefHat size={16} className="mr-1.5" /> Start Cooking
        </Link>
      </div>
    </motion.div>
  );
};

export default RecipeCard;

