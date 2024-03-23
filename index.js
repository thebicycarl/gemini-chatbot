// setup the .env file

import dotenv from 'dotenv'
dotenv.config()

// install promptSync to get user input in terminal 
import promptSync from 'prompt-sync'
const promptUser = promptSync()


// Import Google AI package

import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch API key

const API_KEY = process.env.GOOGLE_AI_API_KEY

// Create new instance of the Google AI
const genAI = new GoogleGenerativeAI(API_KEY);

// Array to store conversation history

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  let convo_history = [
  ]

  const chat = model.startChat({
    history: convo_history,
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
