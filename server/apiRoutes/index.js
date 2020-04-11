const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/puppies', require('./puppies'));
router.use('/kittens', require('./kittens'));

router.use((req, res, next) => {
  const err = new Error('Not Found.');
  err.status = 404;
  next(err);
});

module.exports = router;
