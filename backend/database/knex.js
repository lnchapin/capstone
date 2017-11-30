var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];
var knexConfig = require('knex')(config)

module.exports = knexConfig;
