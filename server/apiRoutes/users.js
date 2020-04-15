const router = require('express').Router();
const { User } = require('../db');

router.get('/', async function (req, res, next) {
  try {
    const users = await User.findAll({
      // no reason to send out the passwords!
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});
router.post('/', function (req, res, next) {
  /* etc */
});
router.put('/:userId', function (req, res, next) {
  /* etc */
});
router.delete('/:userId', function (req, res, next) {
  /* etc */
});

module.exports = router;
