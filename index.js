require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

const { apiRouter } = require('./routers');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});