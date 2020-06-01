const router = require('express').Router();
const users = require('./user/user');
const cards = require('./card/card');

router.use('/users', users);
router.use('/cards', cards);

module.exports = router;
