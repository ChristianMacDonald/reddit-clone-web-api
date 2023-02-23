function validateRegisterAttempt(req, res, next) {
  let user = req.body;

  if (!user) {
    res.status(400).json({ message: 'Missing request body' })
  } else if (!user.username) {
    res.status(400).json({ message: 'Missing username field' });
  } else if (!user.password) {
    res.status(400).json({ message: 'Missing password field' });
  } else {
    next();
  }
}

module.exports = validateRegisterAttempt;