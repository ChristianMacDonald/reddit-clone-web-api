const db = require('../database/database');

function findAll() {
  return db('users').select('id', 'username');
}

module.exports = {
  findAll
};