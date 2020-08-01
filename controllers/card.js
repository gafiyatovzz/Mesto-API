const Card = require('../models/Card');
const errorHandler = require('../utils/errorHandler');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(res, err));
};


module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(res, err));
};


module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: 'Такой карточки не существует' });
      }
      return card;
    })
    .then((card) => {
      if (card.owner == req.user._id) {
        Card.findByIdAndRemove(card._id)
          .then(() => res.send({ message: 'Карточка удалена!' }));
      } else {
        res.status(401).send({ message: 'Запрещено удалять чужие карты' });
      }
    })
    .catch((err) => errorHandler(res, err));
};

// Promise.reject(res.status(404).json({ message: 'Карточка не найдена!' })
module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: [req.user._id] } },
    { new: true },
  )
    .then((card) => (!card ? Promise.reject(res.status(404).json({ message: 'Карточка не найдена!' })) : res.send({ data: card })))
    .catch((err) => errorHandler(res, err));
};


module.exports.disLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => (!card ? Promise.reject(res.status(404).json({ message: 'Карточка не найдена!' })) : res.send({ data: card })))
    .catch((err) => errorHandler(res, err));
};
