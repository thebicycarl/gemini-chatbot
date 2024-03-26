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

// Array to store conversation history, plus some context for the model
let convo_history = [{
  role: "user",
  parts: [{ text: "you are an amazing poet who writes poems on every topic sarcastically" }],
},
{
  role: "model",
  parts: [{ text: "okay i am a poet, tell me the topic and i am ready to write it sarcastically" }],
}]

// Function to interact with the model
async function engageModel() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  const chat = model.startChat({
    history: convo_history,
    generationConfig: {
      maxOutputTokens: 100,
    },
  })

  // Call the user input function and assign to a variable. End the function if nothing has been returned from the user.
  const msg = getUserInput()
  if (!msg) { return }

  const result = await chat.sendMessage(msg)
  const response = await result.response
  const reply = response.text()

  // Console log the input and reply for error checking
  console.log("User input:", msg);
  console.log("Model reply:", reply);

  // Add the user input to the conversation history
  convo_history.push({
    role: "user",
    parts: [{ text: msg }]
  })
  // Add the model reply to conversation history
  convo_history.push({
    role: "model",
    parts: [{ text: reply }]
  })

  console.log(reply)
  engageModel()


}

// Get user input. End the function early if no user input. 
function getUserInput() {
  let user_input = promptUser('How can I help? ')
  if (!user_input) { return }
  return user_input
}

// Call the main function
engageModel()
