const express = require('express');

const { verifyTokenIsValid, verifyTokenOwnerExists } = require('../middleware');
const {
  usersModel: {
    findUserByUsername
  },
  pondSubscriptionsModel: {
    findSubscriptionsBySubscriberID
  }
} = require('../models');

const router = express.Router();

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

router.get('/self/subscriptions', verifyTokenIsValid, verifyTokenOwnerExists, async (req, res) => {
  try {
    let user = req.tokenOwner;
    
    let subscriptions = await findSubscriptionsBySubscriberID(user.id);

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;