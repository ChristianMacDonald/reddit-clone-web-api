const config = require('../knexfile')[process.env.NODE_ENV || 'development'];
const database = require('knex')(config);

module.exports = database;