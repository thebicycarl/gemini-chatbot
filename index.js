// setup the .env file

import dotenv from 'dotenv'

dotenv.config()

// Import Google AI package

import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch API key

const API_KEY = process.env.GOOGLE_AI_API_KEY

// create new instance of the Google AI
const genAI = new GoogleGenerativeAI(API_KEY);

// create a new model

async function run() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "Write me a haiku about my beautiful girlfriend, Nadia"
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  
  run();