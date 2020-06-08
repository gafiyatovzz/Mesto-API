// const assert = require('assert');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');


module.exports.getById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => (!user ? Promise.reject(res.status(404).json({ message: 'Пользователь не найден!' })) : res.send({ data: user })))
    .catch((err) => errorHandler(res, err));
};

module.exports.getAll = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(res, err));
};

module.exports.createUser = (req, res) => {
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
        .catch((err) => errorHandler(res, err));
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findOneAndUpdate(req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .then((user) => (!user ? Promise.reject(res.status(404).json({ message: 'Пользователь не найден!' })) : res.send({ data: user })))
    .catch((err) => errorHandler(res, err));
};

module.exports.updateUserAvatar = (req, res) => {
  console.log(req.user._id);

  User.findByIdAndUpdate(req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .then((user) => (!user ? Promise.reject(res.status(404).json({ message: 'Пользователь не найден!' })) : res.send({ data: user })))
    .catch((err) => errorHandler(res, err));
};
