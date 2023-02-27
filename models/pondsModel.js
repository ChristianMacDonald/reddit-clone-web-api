const db = require('../database/database');

function findAllPonds() {
  return db('ponds');
}

function findPondByID(id) {
  return db('ponds').where({ id }).first();
}

function findPondByName(name) {
  return db('ponds').where({ name }).first();
}

function createPond(pond) {
  return db('ponds').insert(pond, ['id']);
}

function updatePondByName(name, pond) {
  return db('ponds').where({ name }).update(pond);
}

function deletePondByName(name) {
  return db('ponds').where({ name }).del();
}

module.exports = {
  findAllPonds,
  findPondByID,
  findPondByName,
  createPond,
  updatePondByName,
  deletePondByName
}