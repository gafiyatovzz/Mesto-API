const express = require('express');

const router = express.Router();
const controller = require('../controllers/user');

const { celebrate, Joi } = require('../node_modules/celebrate');


router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), controller.getById);

router.get('/', controller.getAll);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .alphanum(),
    about: Joi.string().required().min(2).max(30)
      .alphanum(),
  }),
}), controller.updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), controller.updateUserAvatar);

module.exports = router;
