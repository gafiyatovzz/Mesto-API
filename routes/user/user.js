const router = require('express').Router();
const controller = require('../../controllers/user');

router.get('/:id', controller.getById);

router.get('/', controller.getAll);

router.post('/', controller.create);

module.exports = router;
