const Sequelize = require('sequelize');
const db = require('../database');
const crypto = require('crypto');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    // making '.password' act like a func hides it when serializing to JSON. This is a hack to get around Sequelize's lack of 'private' option. Can read the hashed/salted password, but not actually stored in database
    get() {
      return () => this.getDataValue('password');
    },
  },
  salt: {
    type: Sequelize.STRING,
    // making '.salt' act like a func hides it when serializing to JSON. This is a hack to get around Sequelize's lack of 'private' option. Can read the hashed/salted password, but not actually stored in database
    get() {
      return () => this.getDataValue('salt');
    },
  },
  googleId: {
    type: Sequelize.STRING,
  },
});

// Instance Methods -------------------------------------
User.prototype.correctPassword = function (candidatePassword) {
  return (
    User.encryptPassword(candidatePassword, this.salt()) === this.password()
  );
};

// Class Methods ----------------------------------------
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

// checking if password they entered matches what is in the data base
User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256') // hashing algorithm
    .update(plainText)
    .update(salt)
    .digest('hex');
};

// Hooks -------------------------------------------------:
const setSaltAndPassword = (user) => {
  // .changed is a Sequelize method that checks if 'password' is different than what it is currently for this user instance
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    // using Sequelize getter methods to get the password and salt
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;
