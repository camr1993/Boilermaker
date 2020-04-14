const Sequelize = require('sequelize');
const pkg = require('../../package.json');

// checks package.json's name to see what mode we are in. If we are in 'test' mode, this variable will have '-test' at the end of the name. This is used for testing purposes, which is important for Travis, because Travis runs npm test before it deploys
const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false,
  }
);

module.exports = db;

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close());
}
