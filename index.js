require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const submitRouter  = require('./src/routes/submit');


app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()),
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('We\'re up and running, ready to chat with the coolest AI on the block. 🚀🤖');
});

app.use('/submit', submitRouter);

app.listen(port, () => {
  console.log('Server is running');
});
