const router = require('express').Router();
const users = require('./users/users');
const cards = require('./cards/cards');
const images = require('./img/images');

router.use('/users', users);
router.use('/cards', cards);
router.use('/img', images);

module.exports = router;
