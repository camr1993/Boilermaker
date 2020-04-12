const db = require('./database.js');

const User = require('./models/users');
const Puppy = require('./models/puppies');
const Kitten = require('./models/kittens');

// defining associations
Puppy.belongsTo(User);
Kitten.belongsTo(User);
User.hasMany(Puppy);
User.hasMany(Kitten);

// exporting db to sync in app.listen
// exporting to models post-association to use in routes
module.exports = {
  db,
  User,
  Puppy,
  Kitten,
};
