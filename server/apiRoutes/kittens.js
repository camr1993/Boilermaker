const router = require('express').Router();

router.get('/', function (req, res, next) {
  console.log('kittens GET route!');
});
router.post('/', function (req, res, next) {
  /* etc */
});
router.put('/:kittenId', function (req, res, next) {
  /* etc */
});
router.delete('/:kittenId', function (req, res, next) {
  /* etc */
});

module.exports = router;
