const bcrypt = require('bcryptjs');

function hashPassword(req, res, next) {
  let salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
  let hash = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hash;
  next();
}

module.exports = hashPassword;