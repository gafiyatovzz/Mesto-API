const User = require('../../models/User');

const errorHandler = require('../utils/errorHandler');
const sendData = require('../utils/sendData');


module.exports.getById = (req, res, next) => {
  User.findById(req.params.id)
    .then(sendData)
    .catch(err => errorHandler(err));
}

module.exports.getAll = (req, res) => {
  User.find({ user: req.user.id })
    .then(sendData)
    .catch(err => errorHandler(err));
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(sendData)
    .catch(err => errorHandler(err));
}
