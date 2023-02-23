const hashPassword = require('./hashPassword');
const validateLoginAttempt = require('./validateLoginAttempt');
const validateRegisterAttempt = require('./validateRegisterAttempt');
const verifyPasswordMatches = require('./verifyPasswordMatches');
const verifyUserExists = require('./verifyUserExists');

module.exports = {
  hashPassword,
  validateLoginAttempt,
  validateRegisterAttempt,
  verifyPasswordMatches,
  verifyUserExists
};