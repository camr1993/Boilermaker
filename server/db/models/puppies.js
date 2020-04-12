const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('puppy', {
  name: {
    type: Sequelize.STRING,
  },
});
