// setup the .env file

import dotenv from 'dotenv'
import promptSync from 'prompt-sync'
const promptUser = promptSync()

dotenv.config()

// Import Google AI package

import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch API key

const API_KEY = process.env.GOOGLE_AI_API_KEY

// create new instance of the Google AI
const genAI = new GoogleGenerativeAI(API_KEY);

// array to store conversation history

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello, I have 2 dogs in my house." }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  })

  const msg = getUserInput()

  const result = await chat.sendMessage(msg)
  const response = await result.response
  const text = response.text()
  console.log(text)

}

run()


function getUserInput() {
  let user_input = promptUser('What would you like to know: ')
  return user_input
}
