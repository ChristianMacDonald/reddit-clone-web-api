const db = require('../database/database');

function findAllPonds() {
  return db('ponds');
}

function findPondByName(name) {
  return db('ponds').where({ name }).first();
}

function createPond(pond) {
  return db('ponds').insert(pond, ['id', 'name', 'description']);
}

function updatePondByName(name, pond) {
  return db('ponds').where({ name }).update(pond, ['id', 'name', 'description']);
}

function deletePondByName(name) {
  return db('ponds').where({ name }).del(['id', 'name', 'description']);
}

module.exports = {
  findAllPonds,
  findPondByName,
  createPond,
  updatePondByName,
  deletePondByName
}