const express = require('express');
const jwt = require('jsonwebtoken');

const { hashPassword, validateLoginAttempt, validateRegisterAttempt, verifyPasswordMatches, verifyUserExists } = require('../middleware');
const { usersModel: { createUser } } = require('../models');

const router = express.Router();

router.post('/login', validateLoginAttempt, verifyUserExists, verifyPasswordMatches, async (req, res) => {
  try {
    let token = jwt.sign({ username: req.user.username }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ error: e })
  }
});

router.post('/register', validateRegisterAttempt, hashPassword, async (req, res) => {
  try {
    let [user] = await createUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;