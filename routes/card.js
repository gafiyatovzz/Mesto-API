const router = require('express').Router();
const controller = require('../controllers/card');


router.post('/', controller.createCard);

router.get('/', controller.getCard);

router.delete('/:id', controller.deleteCard);


module.exports = router;
