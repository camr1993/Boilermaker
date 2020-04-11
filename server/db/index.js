const db = require('./database');

const Users = require('./models/users');
const Puppies = require('./models/Puppies');
const Kittens = require('./models/Kittens');

// defining associations
Puppies.belongsTo(Users);
Kittens.belongsTo(Users);
Users.hasMany(Puppies);
Users.hasMany(Kittens);

// exporting db to sync in app.listen
// exporting to models post-association to use in routes
module.exports = {
  db,
  Users,
  Puppies,
  Kittens,
};
