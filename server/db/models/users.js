const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('users', {
  name: {
    type: Sequelize.STRING,
  },
});
