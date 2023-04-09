const express = require('express');

const {
  validate,
  verifyPondExists,
  verifyTokenIsValid,
  verifyTokenOwnerExists
} = require('../middleware');

const {
  pondsModel: {
    createPond,
    deletePondByName,
    findAllPonds,
    findPondByID,
    findPondByName,
    updatePondByName
  },
  postsModel: {
    createPost,
    findPostByID,
    findPostsByPondID
  },
  pondSubscriptionsModel: {
    createSubscription
  }
} = require('../models');
const { findSubscriptionBySubscriberIDAndPondID, deleteSubscriptionBySubscriberIDAndPondID } = require('../models/pondSubsciptionsModel');

const router = express.Router();

router.get(
  '/',
  async (req, res) => {
    try {
      let ponds = await findAllPonds();
      res.status(200).json(ponds);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
);

router.get(
  '/:name',
  verifyPondExists,
  (req, res) => {
    res.status(200).json(req.pond);
  }
);

router.get(
  '/:name/posts',
  verifyPondExists,
  async (req, res) => {
    try {
      let posts = await findPostsByPondID(req.pond.id);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error })
    }
  }
);

router.post(
  '/',
  verifyTokenIsValid,
  validate('name'),
  async (req, res) => {
    try {
      let [{ id }] = await createPond(req.body);
      let pond = await findPondByID(id);
      res.status(201).json(pond);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
);

router.post(
  '/:name/posts',
  verifyTokenIsValid,
  verifyTokenOwnerExists,
  verifyPondExists,
  validate('title', 'content'),
  async (req, res) => {
    try {
      let user = req.tokenOwner;
      let pond = req.pond;
      let draftPost = req.body;

      draftPost.author_id = user.id;
      draftPost.pond_id = pond.id;

      let [{ id }] = await createPost(draftPost);

      let post = await findPostByID(id);

      res.status(201).json(post);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
);

router.post(
  '/:name/subscriptions',
  verifyTokenIsValid,
  verifyTokenOwnerExists,
  verifyPondExists,
  async (req, res) => {
    try {
      let user = req.tokenOwner;
      let pond = req.pond;

      let draftSubscription = {
        subscriber_id: user.id,
        pond_id: pond.id
      }

      let [{ subscriber_id, pond_id }] = await createSubscription(draftSubscription);
      
      let subscription = await findSubscriptionBySubscriberIDAndPondID(subscriber_id, pond_id);

      res.status(201).json(subscription);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

router.put(
  '/:name',
  verifyTokenIsValid,
  verifyPondExists,
  async (req, res) => {
    try {
      let name = req.pond.name;

      await updatePondByName(name, req.body);

      let pond = await findPondByName(name);

      res.status(200).json(pond);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
);

router.delete(
  '/:name',
  verifyTokenIsValid,
  verifyPondExists,
  async (req, res) => {
    try {
      await deletePondByName(req.pond.name);

      res.status(200).json(req.pond);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
);

router.delete(
  '/:name/subscriptions',
  verifyTokenIsValid,
  verifyTokenOwnerExists,
  verifyPondExists,
  async (req, res) => {
    try {
      let user = req.tokenOwner;
      let pond = req.pond;

      let subscription = await findSubscriptionBySubscriberIDAndPondID(user.id, pond.id);

      if (!subscription) {
        res.status(404).json({ message: 'Subscription not found' });
        return;
      }
      
      await deleteSubscriptionBySubscriberIDAndPondID(user.id, pond.id);

      res.status(200).json(subscription);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

module.exports = router;