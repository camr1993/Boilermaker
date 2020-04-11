const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('kittens', {
  name: {
    type: Sequelize.STRING,
  },
});
