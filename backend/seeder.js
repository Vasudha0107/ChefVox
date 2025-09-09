
// // import dotenv from 'dotenv';
// // dotenv.config();

// // import fs from 'fs';
// // import path from 'path';
// // import axios from 'axios';
// // import csvParser from 'csv-parser'; 
// // import connectDB from './config/db.js';
// // import Recipe from './models/recipeModel.js';

// // // ---------- Config from .env (with sensible defaults) ----------
// // const PEXELS_API_KEY = process.env.PEXELS_API_KEY || '';
// // const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || '';
// // const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
// // const GENERATE_STEPS = String(process.env.GENERATE_STEPS || 'false').toLowerCase() === 'true';
// // const GENERATE_LIMIT = Number(process.env.GENERATE_LIMIT || 20); // max number of recipes to auto-generate steps per run
// // const GENERATION_DELAY_MS = Number(process.env.GENERATION_DELAY_MS || 600); // delay between generation calls
// // const IMPORT_LIMIT = Number(process.env.IMPORT_LIMIT || 0); // 0 => import all in recipes.json, >0 => import only that many (useful for test)
// // const DATA_FILE = process.env.DATA_FILE || 'recipes.json';
// // const GEN_MODEL = process.env.GEN_MODEL || ''; // optional model name like 'gemini-1.5' or 'text-bison-001'

// // // ---------- Helpers: image fetching ----------
// // async function searchPixabay(query) {
// //   if (!PIXABAY_API_KEY) return null;
// //   try {
// //     const res = await axios.get('https://pixabay.com/api/', {
// //       params: { key: PIXABAY_API_KEY, q: query, image_type: 'photo', per_page: 3 },
// //       timeout: 10000,
// //     });
// //     return res.data?.hits?.[0]?.webformatURL || null;
// //   } catch (err) {
// //     console.warn('Pixabay err:', err?.message || err.toString?.() || err);
// //     return null;
// //   }
// // }

// // async function searchPexels(query) {
// //   if (!PEXELS_API_KEY) return null;
// //   try {
// //     const res = await axios.get('https://api.pexels.com/v1/search', {
// //       headers: { Authorization: PEXELS_API_KEY },
// //       params: { query, per_page: 1 },
// //       timeout: 10000,
// //     });
// //     return res.data?.photos?.[0]?.src?.medium || null;
// //   } catch (err) {
// //     console.warn('Pexels err:', err?.message || err.toString?.() || err);
// //     return null;
// //   }
// // }

// // function getFallbackImage(recipeName) {
// //   const n = (recipeName || '').toLowerCase();
// //   if (n.includes('curry') || n.includes('masala') || n.includes('dal')) return 'https://images.pexels.com/photos/1117861/pexels-photo-1117861.jpeg';
// //   if (n.includes('biryani') || n.includes('rice')) return 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg';
// //   if (n.includes('kheer') || n.includes('dessert') || n.includes('gulab') || n.includes('jamun')) return 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg';
// //   if (n.includes('paneer') || n.includes('tikka') || n.includes('tandoori')) return 'https://images.pexels.com/photos/88840/pexels-photo-88840.jpeg';
// //   if (n.includes('chicken') || n.includes('chole') || n.includes('mutton') || n.includes('fish')) return 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg';
// //   return 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg';
// // }

// // async function getRecipeImage(recipe) {
// //   // Reuse cached image if present
// //   if (recipe.image && String(recipe.image).trim() !== '') return recipe.image;

// //   // Try Pixabay first (larger free quota)
// //   let image = await searchPixabay(recipe.name);
// //   if (image) return image;

// //   // Try Pexels next
// //   image = await searchPexels(recipe.name);
// //   if (image) return image;

// //   // Final fallback
// //   return getFallbackImage(recipe.name);
// // }

// // // ---------- Gemini step generation (optional) ----------
// // // Note: dynamic import so seeder still runs if package not installed.
// // async function generateStepsWithGemini(recipe) {
// //   if (!GENERATE_STEPS || !GEMINI_API_KEY) return [];

// //   try {
// //     // dynamic import of google package (install @google/generative-ai if you want generation)
// //     const { GoogleGenerativeAI } = await import('@google/generative-ai');

// //     const client = new GoogleGenerativeAI(GEMINI_API_KEY);

// //     // pick model: prefer GEN_MODEL if provided, otherwise common choices (try in order)
// //     const candidates = [];
// //     if (GEN_MODEL) candidates.push(GEN_MODEL);
// //     candidates.push('gemini-1.5', 'gemini-1.5-pro', 'text-bison-001');

// //     let model = null;
// //     for (const mod of candidates) {
// //       try {
// //         model = client.getGenerativeModel({ model: mod });
// //         // if no error thrown we assume it's OK to use
// //         break;
// //       } catch (err) {
// //         // try next
// //       }
// //     }
// //     if (!model) {
// //       console.warn('No usable Gemini model found; skipping generation.');
// //       return [];
// //     }

// //     // Strict prompt: ask for ONLY JSON array of steps
// //     const prompt = `You are a concise, practical chef writing clear numbered cooking steps for home cooks.
// // Recipe title: "${recipe.name}".
// // Ingredients: ${(recipe.ingredients || []).map(i => (i.name || i).toString()).join(', ') || 'none provided'}.
// // Return ONLY a JSON array of step objects. Each object must have:
// //   - "instruction": short sentence describing the step
// //   - "duration": number of seconds approximately for that step
// // Example output:
// // [
// //   {"instruction":"Chop onions","duration":120},
// //   {"instruction":"Sauté onions until golden","duration":300}
// // ]
// // Return 3–12 steps. No extra text outside JSON.`;

// //     // Generate content
// //     const result = await model.generateContent(prompt);
// //     // result.response.text() may be available
// //     const text = (result.response && typeof result.response.text === 'function')
// //       ? result.response.text()
// //       : (result.response?.toString ? result.response.toString() : '');

// //     // Try to extract first JSON array in the response
// //     const start = text.indexOf('[');
// //     const end = text.lastIndexOf(']');
// //     if (start !== -1 && end !== -1 && end > start) {
// //       const arrText = text.slice(start, end + 1);
// //       const parsed = JSON.parse(arrText);
// //       if (Array.isArray(parsed) && parsed.length > 0) {
// //         // normalize output objects
// //         return parsed.map(p => ({
// //           instruction: (p.instruction || p.text || p.step || '').toString().trim(),
// //           duration: Number(p.duration || 0) || 0
// //         })).filter(s => s.instruction);
// //       }
// //     }

// //     // fallback single-step
// //     return [{ instruction: `Cook ${recipe.name} following general method.`, duration: 600 }];
// //   } catch (err) {
// //     console.warn('Gemini generation error:', err?.message || err);
// //     return [];
// //   }
// // }

// // // ---------- Normalizer & sanitizer ----------
// // function normalizeRecipe(raw) {
// //   return {
// //     name: raw.TranslatedRecipeName || "Unnamed Recipe",
// //     description: raw.Cuisine ? `${raw.Cuisine} dish` : "Delicious recipe",
// //     prepTime: Math.max(5, Math.floor(raw.TotalTimeInMins * 0.3) || 10),
// //     cookTime: Math.max(10, Math.floor(raw.TotalTimeInMins * 0.7) || 20),
// //     servings: 4,
// //     difficulty: "medium",
// //     cuisine: raw.Cuisine || "Indian",
// //     ingredients: (raw.TranslatedIngredients || "")
// //       .split(",")
// //       .map((i) => ({ name: i.trim(), quantity: "" }))
// //       .filter((i) => i.name !== ""),
// //     steps: (raw.TranslatedInstructions || "")
// //       .split(".")
// //       .map((s) => s.trim())
// //       .filter((s) => s.length > 0)
// //       .map((s) => ({ instruction: s, duration: 60 })),
// //     image: raw["image-url"] || getFallbackImage(raw.TranslatedRecipeName),
// //     tags: raw.Cuisine
// //       ? [raw.Cuisine.toLowerCase().includes("veg") ? "veg" : "non-veg"]
// //       : ["veg"],
// //   };
// // }



// // // ---------- Main importer ----------
// // async function importData() {
// //   try {
// //     await connectDB();
// //     console.log('🗂 Loading file:', DATA_FILE);

// //     const jsonPath = path.join(process.cwd(), 'data', DATA_FILE);
// //     if (!fs.existsSync(jsonPath)) {
// //       console.error('No recipes.json found at', jsonPath);
// //       process.exit(1);
// //     }

// //     const rawAll = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
// //     let raw = Array.isArray(rawAll) ? rawAll : [];

// //     if (IMPORT_LIMIT > 0) {
// //       raw = raw.slice(0, IMPORT_LIMIT);
// //       console.log(`🔎 IMPORT_LIMIT=${IMPORT_LIMIT}: importing first ${raw.length} recipes (test mode)`);
// //     } else {
// //       console.log(`🔎 Found ${raw.length} recipes in ${DATA_FILE}`);
// //     }

// //     // Prepare array to insert
// //     const processed = [];
// //     let genCount = 0;

// //     for (let i = 0; i < raw.length; i++) {
// //       const orig = raw[i];
// //       const r = normalizeRecipe(orig);

// //       // Ensure required fields exist. If missing, set minimal defaults to avoid schema errors
// //       if (!r.description) r.description = r.name;
// //       if (!r.servings) r.servings = 4;

// //       // IMAGE: fetch if missing (and cache)
// //       if (!r.image || String(r.image).trim() === '') {
// //         try {
// //           r.image = await getRecipeImage(r);
// //           console.log(`📸 image for "${r.name}" -> ${r.image}`);
// //         } catch (err) {
// //           r.image = getFallbackImage(r.name);
// //           console.warn('Used fallback image for', r.name);
// //         }
// //       }

// //       // STEPS: generate if missing and generation enabled and under limit
// //       if ((!r.steps || r.steps.length === 0 || r.steps.every(s => !s.instruction || s.instruction.trim() === '')) && GENERATE_STEPS && genCount < GENERATE_LIMIT) {
// //         console.log(`🤖 Generating steps for "${r.name}" (${genCount + 1}/${GENERATE_LIMIT})`);
// //         const generated = await generateStepsWithGemini(r);
// //         // small delay to avoid hitting rate limits
// //         await new Promise(res => setTimeout(res, GENERATION_DELAY_MS));
// //         if (generated && generated.length > 0) {
// //           r.steps = generated;
// //           genCount++;
// //           console.log(`✅ Generated ${r.steps.length} steps for "${r.name}"`);
// //         } else {
// //           r.steps = [{ instruction: 'No detailed steps available.', duration: 0 }];
// //           console.warn(`⚠️ Generation failed for "${r.name}", used placeholder.`);
// //         }
// //       } else if (!r.steps || r.steps.length === 0) {
// //         // no generation requested or limit reached -> placeholder single step
// //         r.steps = [{ instruction: 'No detailed steps available.', duration: 0 }];
// //       }

// //       processed.push(r);
// //     }

// //     // Clear DB and insert processed array
// //     console.log(`🗑 Clearing recipes collection...`);
// //     await Recipe.deleteMany();
// //     console.log(`📥 Inserting ${processed.length} recipes into DB...`);
// //     await Recipe.insertMany(processed, { ordered: false });

// //     // Write back to recipes.json so images/steps are cached for next run
// //     try {
// //       fs.writeFileSync(jsonPath, JSON.stringify(processed, null, 2), 'utf-8');
// //       console.log(`💾 Wrote back ${processed.length} recipes to ${jsonPath} (images & generated steps cached).`);
// //     } catch (err) {
// //       console.warn('Could not write back recipes.json:', err?.message || err);
// //     }

// //     console.log('✅ Seeder finished.');
// //     process.exit(0);
// //   } catch (err) {
// //     console.error('❌ Seeder error:', err);
// //     process.exit(1);
// //   }
// // }

// // // run importer when called with -i (safe)
// // if (process.argv.includes('-i')) {
// //   importData();
// // } else {
// //   console.log('Usage: node seeder.js -i   (will read data/recipes.json and import)');
// // }

// import dotenv from 'dotenv';
// dotenv.config();

// import fs from 'fs';
// import path from 'path';
// import axios from 'axios';
// import connectDB from './config/db.js';
// import Recipe from './models/recipeModel.js';
// import Papa from 'papaparse';

// // ---------- Config from .env ----------
// const PEXELS_API_KEY = process.env.PEXELS_API_KEY || '';
// const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || '';
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
// const GENERATE_STEPS = String(process.env.GENERATE_STEPS || 'false').toLowerCase() === 'true';
// const GENERATE_LIMIT = Number(process.env.GENERATE_LIMIT || 20);
// const GENERATION_DELAY_MS = Number(process.env.GENERATION_DELAY_MS || 600);
// const IMPORT_LIMIT = Number(process.env.IMPORT_LIMIT || 0);
// const DATA_FILE = process.env.DATA_FILE || 'recipes.json';
// const GEN_MODEL = process.env.GEN_MODEL || 'gemini-1.5-flash';

// // ---------- Helpers: image fetching ----------
// async function searchPixabay(query) {
//   if (!PIXABAY_API_KEY) return null;
//   try {
//     const res = await axios.get('https://pixabay.com/api/', {
//       params: { key: PIXABAY_API_KEY, q: query, image_type: 'photo', per_page: 3 },
//       timeout: 10000,
//     });
//     return res.data?.hits?.[0]?.webformatURL || null;
//   } catch (err) {
//     console.warn('Pixabay err:', err?.message);
//     return null;
//   }
// }

// async function searchPexels(query) {
//   if (!PEXELS_API_KEY) return null;
//   try {
//     const res = await axios.get('https://api.pexels.com/v1/search', {
//       headers: { Authorization: PEXELS_API_KEY },
//       params: { query, per_page: 1 },
//       timeout: 10000,
//     });
//     return res.data?.photos?.[0]?.src?.medium || null;
//   } catch (err) {
//     console.warn('Pexels err:', err?.message);
//     return null;
//   }
// }

// function getFallbackImage(recipeName) {
//   const n = (recipeName || '').toLowerCase();
//   if (n.includes('curry') || n.includes('masala') || n.includes('dal')) return 'https://images.pexels.com/photos/1117861/pexels-photo-1117861.jpeg';
//   if (n.includes('biryani') || n.includes('rice')) return 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg';
//   if (n.includes('kheer') || n.includes('dessert') || n.includes('gulab') || n.includes('jamun')) return 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg';
//   if (n.includes('paneer') || n.includes('tikka') || n.includes('tandoori')) return 'https://images.pexels.com/photos/88840/pexels-photo-88840.jpeg';
//   if (n.includes('chicken') || n.includes('mutton') || n.includes('fish')) return 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg';
//   return 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg';
// }

// async function getRecipeImage(recipe) {
//   if (recipe.image && String(recipe.image).trim() !== '') return recipe.image;

//   let image = await searchPixabay(recipe.name);
//   if (image) return image;

//   image = await searchPexels(recipe.name);
//   if (image) return image;

//   return getFallbackImage(recipe.name);
// }

// // ---------- Gemini step generation ----------
// async function generateStepsWithGemini(recipe) {
//   if (!GENERATE_STEPS || !GEMINI_API_KEY) return [];

//   try {
//     const { GoogleGenerativeAI } = await import('@google/generative-ai');
//     const client = new GoogleGenerativeAI(GEMINI_API_KEY);
//     const model = client.getGenerativeModel({ model: GEN_MODEL });

//     const prompt = `You are a chef. Write clear cooking steps for "${recipe.name}".
// Ingredients: ${(recipe.ingredients || []).map(i => i.name).join(', ') || 'none'}.
// Return ONLY JSON array of objects with "instruction" and "duration" (seconds).`;

//     const result = await model.generateContent(prompt);
//     const text = await result.response.text();
//     const start = text.indexOf('['), end = text.lastIndexOf(']');
//     if (start !== -1 && end !== -1) {
//       const parsed = JSON.parse(text.slice(start, end + 1));
//       return parsed.map(p => ({
//         instruction: p.instruction || '',
//         duration: Number(p.duration || 0)
//       })).filter(s => s.instruction);
//     }
//     return [];
//   } catch (err) {
//     console.warn('Gemini generation error:', err?.message);
//     return [];
//   }
// }

// // ---------- Normalizers ----------
// function normalizeRecipeJSON(raw) {
//   return {
//     name: raw.name || 'Unnamed Recipe',
//     description: raw.description || 'Delicious recipe',
//     prepTime: raw.prepTime || 10,
//     cookTime: raw.cookTime || 20,
//     servings: raw.servings || 4,
//     difficulty: raw.difficulty || 'medium',
//     cuisine: raw.cuisine || 'Indian',
//     ingredients: (raw.ingredients || []).map(i => ({
//       name: i.name || i,
//       quantity: (i.quantity && i.quantity.trim()) ? i.quantity : 'to taste'    // <-- FIX: enforce non-empty
//     })),
//     steps: raw.steps || [],
//     image: (raw.image && raw.image.startsWith('http')) ? raw.image : '',
//     tags: raw.tags || ['veg', 'main'],
//   };
// }

// function normalizeRecipeCSV(raw) {
//   return {
//     name: raw.TranslatedRecipeName || 'Unnamed Recipe',
//     description: raw.Cuisine ? `${raw.Cuisine} dish` : 'Delicious recipe',
//     prepTime: Math.max(5, Math.floor(raw.TotalTimeInMins * 0.3) || 10),
//     cookTime: Math.max(10, Math.floor(raw.TotalTimeInMins * 0.7) || 20),
//     servings: 4,
//     difficulty: 'medium',
//     cuisine: raw.Cuisine || 'Indian',
//     ingredients: (raw.TranslatedIngredients || '')
//       .split(',')
//       .map(i => ({ name: i.trim(), quantity: 'to taste' }))
//       .filter(i => i.name),
//     steps: (raw.TranslatedInstructions || '')
//       .split('.')
//       .map(s => s.trim())
//       .filter(s => s)
//       .map(s => ({ instruction: s, duration: 60 })),
//     image: (raw['image-url'] && raw['image-url'].startsWith('http')) ? raw['image-url'] : '',
//     tags: raw.Cuisine
//       ? [raw.Cuisine.toLowerCase().includes('veg') ? 'veg' : 'non-veg']
//       : ['veg'],
//   };
// }

// // ---------- Main importer ----------
// async function importData() {
//   try {
//     await connectDB();
//     const filePath = path.join(process.cwd(), 'data', DATA_FILE);
//     if (!fs.existsSync(filePath)) {
//       console.error('❌ File not found:', filePath);
//       process.exit(1);
//     }

//     let rawData = [];
//     if (DATA_FILE.endsWith('.json')) {
//       rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
//     } else if (DATA_FILE.endsWith('.csv')) {
//       const csv = fs.readFileSync(filePath, 'utf-8');
//       rawData = Papa.parse(csv, { header: true }).data;
//     }

//     if (IMPORT_LIMIT > 0) rawData = rawData.slice(0, IMPORT_LIMIT);
//     console.log(`📥 Processing ${rawData.length} recipes...`);

//     const processed = [];
//     let genCount = 0;

//     for (const raw of rawData) {
//       const r = DATA_FILE.endsWith('.csv') ? normalizeRecipeCSV(raw) : normalizeRecipeJSON(raw);

//       // Image
//       r.image = await getRecipeImage(r);

//       // Steps
//       if ((!r.steps || r.steps.length === 0) && GENERATE_STEPS && genCount < GENERATE_LIMIT) {
//         const generated = await generateStepsWithGemini(r);
//         if (generated.length) {
//           r.steps = generated;
//           genCount++;
//         } else {
//           r.steps = [{ instruction: 'No detailed steps available.', duration: 0 }];
//         }
//         await new Promise(res => setTimeout(res, GENERATION_DELAY_MS));
//       } else if (!r.steps || r.steps.length === 0) {
//         r.steps = [{ instruction: 'No detailed steps available.', duration: 0 }];
//       }

//       processed.push(r);
//     }

//     await Recipe.deleteMany();
//     await Recipe.insertMany(processed);
//     console.log(`✅ Imported ${processed.length} recipes.`);
//     process.exit(0);
//   } catch (err) {
//     console.error('❌ Seeder error:', err);
//     process.exit(1);
//   }
// }

// // Run
// if (process.argv.includes('-i')) {
//   importData();
// } else {
//   console.log('Usage: node seeder.js -i');
// }

// backend/seeder.js
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import connectDB from "./config/db.js";
import Recipe from "./models/recipeModel.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Config
const CSV_FILE = path.join(
  __dirname,
  "data",
  process.env.DATA_FILE || "Ifood_new.csv"
);
const IMPORT_LIMIT = Number(process.env.IMPORT_LIMIT || 50);

// ---------- Fallback simple step generator ----------
function generateBasicSteps(recipe) {
  const ingr = (recipe.ingredients || [])
    .map(i => i.name)
    .slice(0, 5)
    .join(", ");
  return [
    {
      instruction: `Gather ingredients: ${ingr || "basic spices and staples"}`,
      duration: 120,
    },
    { instruction: "Heat oil/ghee in a pan", duration: 180 },
    { instruction: "Add onions/tomatoes/masala as needed", duration: 300 },
    { instruction: "Cook until flavors blend", duration: 600 },
    { instruction: `Finish and serve ${recipe.name}`, duration: 120 },
  ];
}

// ---- Helpers ----
async function generateInstructions(name, ingredients) {
  try {
    const prompt = `Give step-by-step cooking instructions for the Indian recipe "${name}".
Ingredients: ${ingredients}.
Write clear numbered steps.`;

    const res = await model.generateContent(prompt);
    const text = res.response.text();

    // Split into steps
    return text
      .split(/\d+\.\s+/)
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => ({ instruction: s, duration: 60 }));
  } catch (err) {
    console.error("Gemini error:", err.message);
    return null; // fallback later
  }
}

function normalizeRecipe(row) {
  console.log("Row sample:", row); // Debug once per row

  // Handle variations in header keys (name, Name, BOM issue "﻿name")
  const rawName =
    row.name || row.Name || row["﻿name"] || row[" name"] || row["NAME"];
  const name = rawName?.trim() || "Unnamed Recipe";

  const ingredients = (row.ingredients || "")
    .split(",")
    .map(i => ({ name: i.trim(), quantity: "to taste" }))
    .filter(i => i.name);

  return {
    name,
    description: row.course ? `${row.course} dish` : "Delicious recipe",
    prepTime: Number(row.prep_time) || 15,
    cookTime: Number(row.cook_time) || 30,
    servings: 4,
    difficulty: "medium",
    cuisine: row.region || "Indian",
    ingredients,
    steps: [], // filled later
    image:
      row.img_url?.trim() ||
      "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg",
    tags: [row.course?.toLowerCase() || "main"],
  };
}

// ---- Seeder ----
async function importData() {
  try {
    await connectDB();

    const recipes = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream(CSV_FILE)
        .pipe(csv())
        .on("data", row => {
          if (recipes.length < IMPORT_LIMIT) {
            recipes.push(normalizeRecipe(row));
          }
        })
        .on("end", resolve)
        .on("error", reject);
    });

    // Generate or fallback instructions
    for (let r of recipes) {
      if (!r.steps || r.steps.length === 0) {
        const generated = await generateInstructions(
          r.name,
          r.ingredients.map(i => i.name).join(", ")
        );

        if (generated && generated.length > 0) {
          r.steps = generated;
        } else {
          r.steps = generateBasicSteps(r);
          console.warn(
            `⚠️ Gemini unavailable, generated basic steps for "${r.name}".`
          );
        }
      }
    }

    await Recipe.deleteMany();
    await Recipe.insertMany(recipes);

    console.log(`✅ Imported ${recipes.length} recipes`);
    process.exit();
  } catch (err) {
    console.error("❌ Seeder error:", err);
    process.exit(1);
  }
}

// Run
if (process.argv.includes("-i")) {
  importData();
} else if (process.argv.includes("-d")) {
  (async () => {
    await connectDB();
    await Recipe.deleteMany();
    console.log("Deleted all recipes");
    process.exit(0);
  })();
} else {
  console.log("Usage: node seeder.js -i");
}
