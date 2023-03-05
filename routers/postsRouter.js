const express = require('express');

const {
  verifyPostExists,
  verifyTokenIsValid
} = require('../middleware');

const {
  postsModel: {
    deletePostByID,
    findAllPosts,
    findPostByID,
    updatePostByID
  }
} = require('../models');

const router = express.Router();

router.get(
  '/',
  async (req, res) => {
    try {
      let posts = await findAllPosts();
      res.status(200).json(posts);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
);

router.get(
  '/:id',
  verifyPostExists,
  async (req, res) => {
    try {
      res.status(200).json(req.post);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

router.put(
  '/:id',
  verifyTokenIsValid,
  verifyPostExists,
  async (req, res) => {
    try {
      let id = req.post.id;

      await updatePostByID(id, req.body);

      let post = await findPostByID(id);

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

router.delete(
  '/:id',
  verifyTokenIsValid,
  verifyPostExists,
  async (req, res) => {
    try {
      await deletePostByID(req.post.id);
      res.status(200).json(req.post);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
);

module.exports = router;