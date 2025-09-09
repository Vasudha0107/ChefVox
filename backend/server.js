
import './loadEnv.js';

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';


import cors from 'cors';
import connectDB from './config/db.js';
import recipeRoutes from './routes/recipeRoutes.js';
import openaiRoutes from './routes/openaiRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// import seedRecipes from './seeder.js';

import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import imageProxyRouter from './routes/imageProxy.js';

// ... other app.use() calls
// app.use('/api/image-proxy', imageProxyRouter);


// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/openai', openaiRoutes);

// connectDB().then(() => {
//   // Auto-run seeder only if DB is empty
//   seedRecipes();
// });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error Handling
app.use(notFound);
app.use(errorHandler);

// app.get("/proxy-image", async (req, res) => {
//   try {
//     const url = req.query.url;
//     if (!url) return res.status(400).send("Missing image URL");

//     const response = await fetch(url);
//     if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

//     const contentType = response.headers.get("content-type");
//     res.set("Content-Type", contentType || "image/jpeg");

//     const buffer = await response.arrayBuffer();
//     res.send(Buffer.from(buffer));
//   } catch (err) {
//     console.error("Proxy error:", err.message);
//     res.status(500).send("Image fetch failed");
//   }
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});