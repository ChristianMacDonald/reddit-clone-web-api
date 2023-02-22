const express = require('express');
const router = express.Router();

const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { usersModel: { createUser, findUserByUsername } } = require('../models');

router.post('/login', async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: 'Missing request body' });
    } else if (!req.body.username) {
      res.status(400).json({ message: 'Missing username field' });
    } else if (!req.body.password) {
      res.status(400).json({ message: 'Missing password field' });
    }

    let { username } = req.body;
    
    let user = await findUserByUsername(username, true);

    if (!user) {
      res.status(404).json({ message: `User with username ${username} not found` });
    }
    
    if (compareSync(req.body.password, user.password)) {
      let token = jwt.sign({ username }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: 'Incorrect password given'});
    }
  } catch (e) {
    res.status(500).json({ error: e })
  }
});

router.post('/register', async (req, res) => {
  try {
    let draft = req.body;

    if (!draft) {
      res.status(400).json({ message: 'Missing request body'});
    } else if (!draft.username) {
      res.status(400).json({ message: 'Missing username field' });
    } else if (!draft.password) {
      res.status(400).json({ message: 'Missing password field'});
    }

    let salt = genSaltSync(parseInt(process.env.SALT_ROUNDS));
    draft.password = hashSync(draft.password, salt);

    let [user] = await createUser(draft);

    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;