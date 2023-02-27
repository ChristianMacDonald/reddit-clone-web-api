const {
  postsModel: {
    findPostByID
  }
} = require('../models');

async function verifyPostExists(req, res, next) {
  try {
    let { id } = req.params;

    let post = await findPostByID(id)

    if (!post) {
      res.status(404).json({ message: `Post with id '${id}' not found` });
      return;
    }

    req.post = post;

    next();
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = verifyPostExists;