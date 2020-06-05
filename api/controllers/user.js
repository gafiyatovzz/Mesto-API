// const assert = require('assert');
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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(res, err));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findOneAndUpdate(req.params.id,
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
