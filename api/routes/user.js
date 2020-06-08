const express = require('express');
const controller = require('../controllers/user');

const router = express.Router();

router.get('/:id', controller.getById);

router.get('/', controller.getAll);

router.patch('/me', controller.updateUser);

router.patch('/me/avatar', controller.updateUserAvatar);

module.exports = router;
