const bcrypt = require('bcryptjs');

function verifyPasswordMatches(req, res, next) {
  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    next();
  } else {
    res.status(400).json({ message: 'Incorrect password provided' });
  }
}

module.exports = verifyPasswordMatches;