const express = require('express');
const router = express.Router();
const { User } = require('../db');

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(401).send('User not found.');
    }
    // instance method we defined in the model
    else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Incorrect password');
    } else {
      // passport gives us req.login. This is a way to manually set req.user to sync up with session
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    }
    next(error);
  }
});

router.delete('/logout', (req, res, next) => {
  // passport method that removes the user from the session and deletes req.user
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

router.get('/me', (req, res, next) => {
  // passport gives us req.user until it is logged out, so we can use this on the front end to keep track of any logged in users
  res.json(req.user);
});

router.use('/google', require('./google'));

router.use((req, res, next) => {
  const err = new Error('Not Found.');
  err.status = 404;
  next(err);
});

module.exports = router;
