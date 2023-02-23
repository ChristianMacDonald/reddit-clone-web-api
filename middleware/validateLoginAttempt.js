function validateLoginAttempt(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'No request body provided' });
  } else if (!req.body.username) {
    res.status(400).json({ message: 'No username field provided' });
  } else if (!req.body.password) {
    res.status(400).json({ message: 'No password field provided' });
  } else {
    next();
  }
}

module.exports = validateLoginAttempt;