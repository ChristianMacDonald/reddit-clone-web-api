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
  }
} = require('../models');

const router = express.Router();

router.use(verifyTokenIsValid);

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

router.put(
  '/:name',
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

module.exports = router;