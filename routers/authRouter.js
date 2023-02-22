const express = require('express');
const router = express.Router();

const { usersModel: { createUser } } = require('../models');

router.post('/register', async (req, res) => {
  try {
    if (!req.body.username) {
      res.status(400).json({ message: 'Missing username field' });
    }

    if (!req.body.password) {
      res.status(400).json({ message: 'Missing password field'});
    }

    let [user] = await createUser(req.body);

    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;