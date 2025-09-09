// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ChefHat, Mic, Search, List } from 'lucide-react';
// import { motion } from 'framer-motion';

// const HomePage = () => {
//   const features = [
//     {
//       icon: <Mic className="text-primary-500" size={24} />,
//       title: 'Voice Guided Cooking',
//       description: 'Follow recipes step by step with clear audio instructions and voice command navigation.',
//     },
//     {
//       icon: <ChefHat className="text-primary-500\" size={24} />,
//       title: 'Cooking Assistance',
//       description: 'Get help when you need it. Ask questions and receive solutions in real-time.',
//     },
//     {
//       icon: <Search className="text-primary-500" size={24} />,
//       title: 'Ingredient-Based Search',
//       description: 'Find recipes based on ingredients you already have in your kitchen.',
//     },
//     {
//       icon: <List className="text-primary-500\" size={24} />,
//       title: 'Detailed Recipes',
//       description: 'Browse our collection of recipes with clear instructions and cooking tips.',
//     },
//   ];

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-br from-primary-500 to-primary-700 text-white py-16 md:py-24">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-center">
//             <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
//               <motion.h1 
//                 className="text-4xl md:text-5xl font-bold mb-4"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 Cook with Your Voice, <br />Hands-Free
//               </motion.h1>
//               <motion.p 
//                 className="text-lg md:text-xl mb-8 text-primary-100"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//               >
//                 Your personal voice-guided cooking assistant that helps you create delicious meals while keeping your hands free for cooking.
//               </motion.p>
//               <motion.div 
//                 className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               >
//                 <Link to="/recipes" className="btn bg-white text-primary-600 hover:bg-primary-50">
//                   Browse Recipes
//                 </Link>
//                 <Link to="/ingredient-search" className="btn bg-primary-600 text-white border border-primary-400 hover:bg-primary-700">
//                   Search by Ingredients
//                 </Link>
//               </motion.div>
//             </div>
//             <div className="md:w-1/2">
//               <motion.img 
//                 src="https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg"
//                 alt="Person cooking with voice assistant"
//                 className="rounded-lg shadow-2xl"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//               />
//             </div>
//           </div>
//         </div>
        
//         {/* Wave SVG separator */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
//             <path d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,53.3C840,43,960,21,1080,16C1200,11,1320,21,1380,26.7L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
//           </svg>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">How VoiceChef Works</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <motion.div 
//                 key={index}
//                 className="card hover:border-primary-500 transition-all duration-300"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//               >
//                 <div className="p-4 bg-primary-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-neutral-600">{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-16 bg-neutral-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Start Cooking in 3 Simple Steps</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 step: 1,
//                 title: "Choose a Recipe",
//                 description: "Browse our collection or search based on ingredients you have.",
//                 image: "https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg",
//               },
//               {
//                 step: 2,
//                 title: "Start Voice Guidance",
//                 description: "Enter cooking mode and let our assistant guide you through each step.",
//                 image: "https://images.pexels.com/photos/7437489/pexels-photo-7437489.jpeg",
//               },
//               {
//                 step: 3,
//                 title: "Cook Hands-Free",
//                 description: "Use voice commands to navigate steps and get help when needed.",
//                 image: "https://images.pexels.com/photos/8472874/pexels-photo-8472874.jpeg",
//               },
//             ].map((item, index) => (
//               <motion.div 
//                 key={index} 
//                 className="relative"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.2 }}
//               >
//                 <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-xl">
//                   {item.step}
//                 </div>
//                 <div className="card overflow-hidden">
//                   <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
//                     <img 
//                       src={item.image} 
//                       alt={item.title} 
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//                   <p className="text-neutral-600">{item.description}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
          
//           <div className="text-center mt-12">
//             <Link to="/recipes" className="btn-primary">
//               Get Started Now
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-secondary-500 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-4">Ready to transform your cooking experience?</h2>
//           <p className="text-lg max-w-2xl mx-auto mb-8">
//             Join thousands of home cooks who are already enjoying stress-free, hands-free cooking with VoiceChef.
//           </p>
//           <Link to="/recipes" className="btn bg-white text-secondary-600 hover:bg-secondary-50">
//             Browse Recipes
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;
import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Mic, Search, List } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage = () => {
  const features = [
    {
      icon: <Mic className="text-primary-500" size={24} />,
      title: 'Voice Guided Cooking',
      description: 'Follow recipes step by step with clear audio instructions and voice command navigation.',
    },
    {
      icon: <ChefHat className="text-primary-500\" size={24} />,
      title: 'Cooking Assistance',
      description: 'Get help when you need it. Ask questions and receive solutions in real-time.',
    },
    {
      icon: <Search className="text-primary-500\" size={24} />,
      title: 'Ingredient-Based Search',
      description: 'Find recipes based on ingredients you already have in your kitchen.',
    },
    {
      icon: <List className="text-primary-500\" size={24} />,
      title: 'Detailed Recipes',
      description: 'Browse our collection of recipes with clear instructions and cooking tips.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 to-primary-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Cook with Your Voice, <br />Hands-Free
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl mb-8 text-primary-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Your personal voice-guided cooking assistant that helps you create delicious meals while keeping your hands free for cooking.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to="/recipes" className="btn bg-white text-primary-600 hover:bg-primary-50">
                  Browse Recipes
                </Link>
                <Link to="/ingredient-search" className="btn bg-primary-600 text-white border border-primary-400 hover:bg-primary-700">
                  Search by Ingredients
                </Link>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.img 
                src="https://images.pexels.com/photos/7262897/pexels-photo-7262897.jpeg"
                alt="Person using voice commands while cooking"
                className="rounded-lg shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </div>
          </div>
        </div>
        
        {/* Wave SVG separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
            <path d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,53.3C840,43,960,21,1080,16C1200,11,1320,21,1380,26.7L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How VoiceChef Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="card hover:border-primary-500 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-4 bg-primary-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Start Cooking in 3 Simple Steps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Choose a Recipe",
                description: "Browse our collection or search based on ingredients you have.",
                image: "https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg",
              },
              {
                step: 2,
                title: "Start Voice Guidance",
                description: "Enter cooking mode and let our assistant guide you through each step.",
                image: "https://images.pexels.com/photos/7437489/pexels-photo-7437489.jpeg",
              },
              {
                step: 3,
                title: "Cook Hands-Free",
                description: "Use voice commands to navigate steps and get help when needed.",
                image: "https://images.pexels.com/photos/8472874/pexels-photo-8472874.jpeg",
              },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <div className="card overflow-hidden">
                  <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-neutral-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/recipes" className="btn-primary">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your cooking experience?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Join thousands of home cooks who are already enjoying stress-free, hands-free cooking with VoiceChef.
          </p>
          <Link to="/recipes" className="btn bg-white text-secondary-600 hover:bg-secondary-50">
            Browse Recipes
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;