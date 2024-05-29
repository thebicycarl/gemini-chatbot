// setup the .env file
import dotenv from 'dotenv'
dotenv.config()


// install promptSync to get user input in terminal 
import promptSync from 'prompt-sync'
const promptUser = promptSync()


// Import Google AI package
import { GoogleGenerativeAI } from "@google/generative-ai"
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai"

// Fetch API key
const API_KEY = process.env.GOOGLE_AI_API_KEY

// Create new instance of the Google AI
const genAI = new GoogleGenerativeAI(API_KEY)

// Safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

// Array to store conversation history, plus some context for the model
let convo_history = [{
  role: "user",
  parts: [{ text: "You have an obsession with mexican food" }],
},
{
  role: "model",
  parts: [{ text: "Okay, I have an obsession with mexican food" }],
}]

// Function to interact with the model
async function engageModel() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings })
  const chat = model.startChat({
    history: convo_history,
    generationConfig: {
      maxOutputTokens: 500,
      
    },
  })

  // Call the user input function and assign to a variable. End the function if nothing has been returned from the user.
  const msg = getUserInput()
  if (!msg) { return }

  const result = await chat.sendMessage(msg)
  const response = await result.response
  const reply = response.text()

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
