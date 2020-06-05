const Card = require('../models/Card');
const errorHandler = require('../utils/errorHandler');

module.exports.createCard = (req, res) => {
  const { name, link, ownerId } = req.body;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(res, err));
};


module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(res, err));
};


module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => (!card ? Promise.reject(res.status(400).json({ message: 'Карточка не найдена!' })) : res.send({ data: card })))
    .catch((err) => errorHandler(res, err));
};


module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: [req.user._id] } },
    { new: true },
  )
    .then((card) => (!card ? Promise.reject(res.status(400).json({ message: 'Карточка не найдена!' })) : res.send({ data: card })))
    .catch((err) => errorHandler(res, err));
};


module.exports.disLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => (!card ? Promise.reject(res.status(400).json({ message: 'Карточка не найдена!' })) : res.send({ data: card })))
    .catch((err) => errorHandler(res, err));
};
