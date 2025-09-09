import mongoose from 'mongoose';

const stepSchema = mongoose.Schema({
  instruction: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 0,
  },
  tips: {
    type: String,
  },
});

const ingredientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: false,
  },
});

const recipeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    prepTime: {
      type: Number,
      required: true,
    },
    cookTime: {
      type: Number,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
      default: 4,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['easy', 'medium', 'hard'],
    },
    cuisine: {
      type: String,
    },
    ingredients: [ingredientSchema],
    steps: [stepSchema],
    image: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Create an index for ingredient search
recipeSchema.index({ "ingredients.name": 1 });

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;

