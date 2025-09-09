// backend/check_recipes.js
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import Recipe from './models/recipeModel.js';

async function run() {
  await connectDB();
  const count = await Recipe.countDocuments();
  console.log('Recipe count in DB:', count);
  const few = await Recipe.find().limit(5).select('name image steps').lean();
  console.dir(few, { depth: 3 });
  process.exit(0);
}
run();
