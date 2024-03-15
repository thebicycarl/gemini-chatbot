require('dotenv').config()

// Import and initialise Google AI

import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch API key

const API_KEY = process.env.GOOGLE_AI_API_KEY
// const genAI = new GoogleGenerativeAI(API_KEY);

console.log(API_KEY)