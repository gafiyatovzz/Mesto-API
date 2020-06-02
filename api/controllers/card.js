const Card = require('../models/Card');
const errorHandler = require('../utils/errorHandler');


module.exports.createCard = (req, res) => {
  console.log(req.user._id); // временное решение авторизации

  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(res, err));
};


module.exports.getCard = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(res, err));
};


module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(res, err));
};


module.exports.addLikes = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(res, err));
};


module.exports.disLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(res, err));
};


module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(res, err));
};
