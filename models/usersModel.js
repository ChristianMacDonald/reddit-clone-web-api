const db = require('../database/database');

function findUserByUsername(username, includeAllColumns=false) {
  if (includeAllColumns) {
    return db('users').where({ username }).first();
  } else {
    return db('users').where({ username }).select('id', 'username').first();
  }
}

function createUser(user) {
  return db('users').insert(user, ['id', 'username']);
}

module.exports = {
  findUserByUsername,
  createUser
};