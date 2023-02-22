const express = require('express');
const router = express.Router();

const authRouter = require('./authRouter');
const usersRouter = require('./usersRouter');

router.get('/', (req, res) => {
  res.send('Welcome to the Ribbit API!');
});

router.use('/auth', authRouter);
router.use('/users', usersRouter);

module.exports = router;