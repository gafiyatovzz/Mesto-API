const router = require('express').Router();
const controller = require('../controllers/card');


router.post('/', controller.createCard);

router.get('/', controller.getCard);

router.delete('/:id', controller.deleteCard);

router.delete('/:id/likes', controller.disLike);

router.put('/:id/likes', controller.addLike);


module.exports = router;
