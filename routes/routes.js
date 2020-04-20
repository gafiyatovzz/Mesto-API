const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');
// const images = require('./img/images');

router.use('/users', users);
router.use('/cards', cards);
// router.use('/img', images);

module.exports = router;
