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
let convo_history = [{
  role: "user",
  parts: [{ text: "" }],
},
{
  role: "model",
  parts: [{ text: "" }],
}]

async function engageModel() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })
  
  const chat = model.startChat({
    history: convo_history,
    generationConfig: {
      maxOutputTokens: 100,
    },
  })

  const msg = getUserInput()
  if (!msg) { return }

  const result = await chat.sendMessage(msg)
  const response = await result.response
  const reply = response.text()
  convo_history.push({
    role: "user",
    parts: [{text: msg}]
  })
  convo_history.push({
    role: "model",
    parts: [{text: reply}]
  })
  
  console.log(reply)
  engageModel()


}

function getUserInput() {
  let user_input = promptUser('How can I help? ')
  return user_input
}
engageModel()
