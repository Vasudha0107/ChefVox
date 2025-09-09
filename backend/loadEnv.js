// loadEnv.js
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Force load the .env file BEFORE anything else
dotenv.config({ path: path.resolve(__dirname, '.env') });
// console.log('✅ ENV LOADED in loadEnv.js:', process.env.OPENAI_API_KEY);
