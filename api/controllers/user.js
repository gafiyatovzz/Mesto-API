const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');


module.exports.getById = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => errorHandler(res, err));
}

module.exports.getAll = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => errorHandler(res, err));
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => errorHandler(res, err));
}

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findOneAndUpdate(req.params.id, { name, about })
    .then(user => res.send({ data: user }))
    .catch(err => errorHandler(res, err));
}

module.exports.updateUserAvatar = (req, res) => {

  User.findOneAndUpdate(req.params.id, { avatar: req.body.avatar })
    .then(user => res.send({ data: user }))
    .catch(err => errorHandler(res, err));
}
