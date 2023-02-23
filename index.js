require('dotenv').config();

const express = require('express');
const app = express();
const port = 4000;

const { apiRouter } = require('./routers');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});