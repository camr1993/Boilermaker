const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('kitten', {
  name: {
    type: Sequelize.STRING,
  },
});
