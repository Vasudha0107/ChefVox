// import asyncHandler from 'express-async-handler';
// import OpenAI from 'openai';
// import fs from 'fs';

// const getOpenAIInstance = () => {
//   if (!process.env.OPENAI_API_KEY) {
//     throw new Error('❌ OPENAI_API_KEY not set in environment!');
//   }

//   return new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
// };

// const transcribeAudio = asyncHandler(async (req, res) => {
//   const openai = getOpenAIInstance();

//   const { audioData } = req.body;

//   if (!audioData) {
//     res.status(400);
//     throw new Error('No audio data provided');
//   }

//   const buffer = Buffer.from(audioData.split(',')[1], 'base64');
//   const tempFilePath = `/tmp/audio-${Date.now()}.webm`;
//   fs.writeFileSync(tempFilePath, buffer);

//   const transcription = await openai.audio.transcriptions.create({
//     file: fs.createReadStream(tempFilePath),
//     model: 'whisper-1',
//   });

//   fs.unlinkSync(tempFilePath);

//   res.json({ text: transcription.text });
// });


// const getCookingAssistance = asyncHandler(async (req, res) => {
//   const openai = getOpenAIInstance();

//   const { query, recipeContext } = req.body;

//   if (!query) {
//     return res.status(400).json({ message: 'No query provided' });
//   }

//   try {
//     const systemPrompt = `
//       You are a professional chef assistant.
//       Be concise, practical, and helpful.
//       Provide clear guidance as if helping someone cook in real time.
//     `;

//     let userPrompt = `The user is asking: "${query}".`;
//     if (recipeContext) {
//       userPrompt += ` They are currently cooking: ${recipeContext.name}.`;
//       if (recipeContext.currentStep) {
//         userPrompt += ` They are on step ${recipeContext.currentStepNumber}: ${recipeContext.currentStep}.`;
//       }
//     }

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini" ,  
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: userPrompt },
//       ],
//     });

//     res.json({ response: completion.choices[0].message.content });
//   } catch (error) {
//     console.error("❌ ChatGPT API Error:", error.response?.data || error.message);
//     res.status(500).json({ message: "Error getting assistance", details: error.message });
//   }
// });

// export { transcribeAudio, getCookingAssistance };
// backend/controllers/openaiController.js
import asyncHandler from 'express-async-handler';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// ✅ Init Gemini
const getGeminiInstance = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('❌ GEMINI_API_KEY not set in environment!');
  }
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

// @desc    Transcribe audio (⚠️ Whisper/OpenAI removed, Gemini doesn’t support direct audio transcription yet)
//          If you need transcription, use browser SpeechRecognition (what you’re already doing now).
// @route   POST /api/openai/transcribe
// @access  Public
const transcribeAudio = asyncHandler(async (req, res) => {
  res.status(400).json({
    message: 'Transcription is now handled in the browser using Web Speech API.',
  });
});

// @desc    Get cooking assistance from Gemini
// @route   POST /api/openai/cooking-assistance
// @access  Public
const getCookingAssistance = asyncHandler(async (req, res) => {
  const genAI = getGeminiInstance();

  const { query, recipeContext } = req.body;

  if (!query) {
    res.status(400);
    throw new Error('No query provided');
  }

  let prompt = "You are a friendly professional Indian chef assistant helping someone cook step by step.\n\n";

  if (recipeContext) {
    prompt += `The user is currently cooking: ${recipeContext.name}.\n`;
    if (recipeContext.currentStep) {
      prompt += `They are on step ${recipeContext.currentStepNumber}: ${recipeContext.currentStep}.\n`;
    }
  }

  prompt += `The user asks: "${query}". Provide a helpful, concise, and practical cooking answer.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ response: text });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({
      message: 'Error getting cooking assistance',
      error: error.message,
    });
  }
});

export { transcribeAudio, getCookingAssistance };

