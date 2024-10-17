const express = require("express");
const { getGroqChatCompletion } = require("../groq");
const router =  express.Router();

router.post('/',async (req, res) =>{
    const {prompt} = req.body;
    console.log(prompt);

    if(!prompt) {
        return res.status(400).json({ error: 'prompt is required' });
    }
    try {
        const chatAnswer = await getGroqChatCompletion(prompt);
        const text =chatAnswer.choices[0]?.message?.content || "";
        res.status(200).json({ result: text });
    }
    catch(e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;