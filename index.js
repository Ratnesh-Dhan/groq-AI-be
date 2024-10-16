require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const { getGroqChatCompletion } = require('./src/groq');
const { sendEmail } = require('./sendMail');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use(express.json());

app.post('/submit', async(req, res) => {
    console.log("requesting...");
  const { email, prompt} = req.body;
//   console.log(email,prompt);
//   console.log({apikey: process.env.GROQ_API_KEY})
  //console.log(req);
  
  if (!email || !prompt) {
    return res.status(400).json({ error: 'Both strings are required' });
  }

  const chatCompletion = await getGroqChatCompletion(prompt);
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
  const text =chatCompletion.choices[0]?.message?.content || "";
  if(text)
    sendEmail(email, "Your Groq AI  Response", text);

  // Process the strings here (e.g., concatenate, compare, etc.)
  const result = `Received: ${email} and ${prompt}`;
  console.log(result);

  res.json({ message: 'Strings received successfully', result });
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
