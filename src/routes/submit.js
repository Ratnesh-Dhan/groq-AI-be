const express =  require('express');
const { getGroqChatCompletion } = require('../groq');
const { sendEmail } = require('../../sendMail');
const router =  express.Router();

router.post('/', async(req, res) => {
    const { email, prompt} = req.body;
    console.log(`POST: /submit ${email} ${prompt}`);
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
module.exports = router; 