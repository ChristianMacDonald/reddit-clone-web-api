const { verify } = require('jsonwebtoken');

function verifyTokenIsValid(req, res, next) {
  try {
    let { token } = req.headers;

    if (token) {
      req.tokenPayload = verify(token, process.env.JWT_SECRET);
      next();
    } else {
      res.status(400).json({ message: 'No token header provided' });
    }
  } catch (e) {
    res.status(400).json({ message: 'Invalid token provided' });
  }
}

module.exports = verifyTokenIsValid;