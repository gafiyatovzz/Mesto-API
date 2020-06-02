const express = require('express');
const controller = require('../controllers/user');
const router = express.Router();

router.get('/:id', controller.getById);

router.get('/', controller.getAll);

router.post('/', controller.createUser);

module.exports = router;
