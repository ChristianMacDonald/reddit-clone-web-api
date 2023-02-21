const express = require('express');
const router = express.Router();

const { usersModel } = require('../models');

router.get('/', async (req, res) => {
  try {
    let users = await usersModel.findAll();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;