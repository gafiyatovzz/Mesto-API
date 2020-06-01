const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router.get('/:id', controller.getById);

router.get('/', controller.getAll);

router.post('/', controller.createUser);

module.exports = router;
