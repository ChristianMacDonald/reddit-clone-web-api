const express = require('express');

const { verifyTokenIsValid } = require('../middleware');
const { usersModel: { findUserByUsername } } = require('../models');

const router = express.Router();

router.use(verifyTokenIsValid);

router.get('/:username', async (req, res) => {
  try {
    let { username } = req.params;
    let user = await findUserByUsername(username);

    if (!user) {
      res.status(404).json({ message: `Could not find user with username ${username}` });
    }

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;