const express = require('express');
const router = express.Router();

const usersRouter = require('./usersRouter');

router.get('/', (req, res) => {
  res.send('Welcome to the Ribbit API!');
});

router.use('/users', usersRouter);

module.exports = router;