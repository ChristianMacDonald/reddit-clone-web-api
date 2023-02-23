const { usersModel: { findUserByUsername } } = require('../models');

async function verifyUserExists(req, res, next) {
  try {
    let { username } = req.body;

    let user = await findUserByUsername(username, true);

    if (!user) {
      res.status(404).json({ message: `Could not find user with username ${username}` });
    } else {
      req.user = user;
      next();
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
}

module.exports = verifyUserExists;