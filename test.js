import promptSync from 'prompt-sync'
const promptUser = promptSync()


let convo_history = [{
    role: "user",
    parts: [{ text: "you are an amazing poet who writes poems on every topic sarcastically" }],
},
{
    role: "model",
    parts: [{ text: "okay i am a poet, tell me the topic and i am ready to write it sarcastically" }],
},
{
    role: "model",
    parts: []
}]




async function getUserInput() {
    let input = await promptUser('what to enter: ')
    if (!input) {
        return
    }
    convo_history.push({
        role: "user",
        parts: [{ text: input }]
    })
    console.log(convo_history)

    let filtered_convo_history = convo_history.filter(obj => obj.parts.length > 0)
    console.log(filtered_convo_history)
    getUserInput()

}

getUserInput()
