const { usersModel: { findUserByUsername } } = require('../models');

async function verifyTokenOwnerExists(req, res, next) {
  try {
    let { username } = req.tokenPayload;
    
    let tokenOwner = await findUserByUsername(username);

    if (!tokenOwner) {
      res.status(404).json({ message: `User with username '${username}' not found` });
      return;
    }

    req.tokenOwner = tokenOwner;

    next();
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = verifyTokenOwnerExists;