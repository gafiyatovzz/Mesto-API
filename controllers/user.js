const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const NotFoundError = require('../utils/NotFoundError');

module.exports.getById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.getAll = (req, res, next) => {
  User.find({})
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Неверный параметр запроса. Ошибка 404.');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Неверный параметр запроса. Ошибка 404.');
      }
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 360000,
          httpOnly: true,
        })
        .end();
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  User.findOne({ email: req.body.email });

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      })
        .then((user) => {
          res.status(201).send({
            data: {
              _id: user._id,
              name: user.name,
              about: user.about,
              avatar: user.avatar,
              email: user.email,
            },
          });
        })
        .catch(next);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findOneAndUpdate(req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Неверный параметр запроса.');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Неверный параметр запроса.');
      }
      res.send({ data: user });
    })
    .catch(next);
};
