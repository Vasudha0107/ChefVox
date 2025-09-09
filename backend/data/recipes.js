const recipes = [
  {
    name: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Italian',
    ingredients: [
      { name: 'spaghetti', quantity: '1', unit: 'pound' },
      { name: 'pancetta', quantity: '8', unit: 'ounces' },
      { name: 'eggs', quantity: '4', unit: '' },
      { name: 'parmesan cheese', quantity: '1', unit: 'cup' },
      { name: 'black pepper', quantity: '1', unit: 'teaspoon' },
      { name: 'salt', quantity: '1', unit: 'teaspoon' }
    ],
    steps: [
      { instruction: 'Bring a large pot of salted water to boil. Add spaghetti and cook until al dente.', duration: 600 },
      { instruction: 'While pasta cooks, heat a large skillet over medium heat. Add diced pancetta and cook until crispy.', duration: 300 },
      { instruction: 'In a bowl, whisk together eggs, grated parmesan, and black pepper.', duration: 120 },
      { instruction: 'When pasta is done, reserve 1/2 cup of pasta water, then drain pasta.', duration: 60 },
      { instruction: 'Working quickly, add hot pasta to the skillet with pancetta. Toss to coat.', duration: 60 },
      { instruction: 'Remove from heat and add the egg mixture, stirring constantly to create a creamy sauce. Add pasta water as needed.', duration: 120 },
      { instruction: 'Serve immediately with extra cheese and black pepper.', duration: 60 }
    ],
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    tags: ['pasta', 'italian', 'dinner', 'quick']
  },
  {
    name: 'Classic Chocolate Chip Cookies',
    description: 'Soft and chewy chocolate chip cookies that are perfect for any occasion.',
    prepTime: 15,
    cookTime: 10,
    servings: 24,
    difficulty: 'easy',
    cuisine: 'American',
    ingredients: [
      { name: 'all-purpose flour', quantity: '2 1/4', unit: 'cups' },
      { name: 'baking soda', quantity: '1', unit: 'teaspoon' },
      { name: 'salt', quantity: '1', unit: 'teaspoon' },
      { name: 'butter', quantity: '1', unit: 'cup' },
      { name: 'granulated sugar', quantity: '3/4', unit: 'cup' },
      { name: 'brown sugar', quantity: '3/4', unit: 'cup' },
      { name: 'vanilla extract', quantity: '1', unit: 'teaspoon' },
      { name: 'eggs', quantity: '2', unit: '' },
      { name: 'chocolate chips', quantity: '2', unit: 'cups' }
    ],
    steps: [
      { instruction: 'Preheat oven to 375°F (190°C).', duration: 300 },
      { instruction: 'In a small bowl, mix flour, baking soda, and salt.', duration: 60 },
      { instruction: 'In a large bowl, beat butter, granulated sugar, brown sugar, and vanilla until creamy.', duration: 180 },
      { instruction: 'Add eggs one at a time, beating well after each addition.', duration: 120 },
      { instruction: 'Gradually beat in flour mixture.', duration: 120 },
      { instruction: 'Stir in chocolate chips.', duration: 60 },
      { instruction: 'Drop by rounded tablespoon onto ungreased baking sheets.', duration: 180 },
      { instruction: 'Bake for 9 to 11 minutes or until golden brown.', duration: 600 },
      { instruction: 'Let stand for 2 minutes; remove to wire racks to cool completely.', duration: 120 }
    ],
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg',
    tags: ['dessert', 'cookies', 'baking', 'chocolate']
  },
  {
    name: 'Vegetable Stir Fry',
    description: 'A quick and healthy stir fry loaded with colorful vegetables.',
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Asian',
    ingredients: [
      { name: 'broccoli', quantity: '2', unit: 'cups' },
      { name: 'bell peppers', quantity: '2', unit: '' },
      { name: 'carrots', quantity: '2', unit: '' },
      { name: 'snow peas', quantity: '1', unit: 'cup' },
      { name: 'vegetable oil', quantity: '2', unit: 'tablespoons' },
      { name: 'garlic', quantity: '3', unit: 'cloves' },
      { name: 'ginger', quantity: '1', unit: 'tablespoon' },
      { name: 'soy sauce', quantity: '3', unit: 'tablespoons' },
      { name: 'sesame oil', quantity: '1', unit: 'teaspoon' },
      { name: 'rice', quantity: '2', unit: 'cups' }
    ],
    steps: [
      { instruction: 'Prepare rice according to package instructions.', duration: 1200 },
      { instruction: 'Chop all vegetables into bite-sized pieces.', duration: 300 },
      { instruction: 'Heat vegetable oil in a large wok or skillet over high heat.', duration: 60 },
      { instruction: 'Add minced garlic and ginger, stir for 30 seconds until fragrant.', duration: 30 },
      { instruction: 'Add vegetables, starting with the ones that take longest to cook (carrots, broccoli).', duration: 120 },
      { instruction: 'Stir fry for 2-3 minutes, then add remaining vegetables.', duration: 180 },
      { instruction: 'Add soy sauce and continue stir frying until vegetables are crisp-tender.', duration: 120 },
      { instruction: 'Drizzle with sesame oil and toss.', duration: 30 },
      { instruction: 'Serve hot over prepared rice.', duration: 60 }
    ],
    image: 'https://images.pexels.com/photos/5966431/pexels-photo-5966431.jpeg',
    tags: ['vegetarian', 'healthy', 'quick', 'asian']
  }
];

export default recipes;