const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('puppies', {
  name: {
    type: Sequelize.STRING,
  },
});
