require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const submitRouter  = require('./src/routes/submit');
const messageRouter = require('./src/routes/message');


app.use(cors({
  //origin: '*',            //Line for test
  origin: [process.env.ORIGIN1, process.env.ORIGIN2, process.env.ORIGIN3],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('We\'re up and running, ready to chat with the coolest AI on the block. 🚀🤖');
});

app.use('/submit', submitRouter);

app.use('/message', messageRouter);

app.listen(port, () => {
  console.log('Server is running');
});
