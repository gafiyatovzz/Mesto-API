const Card = require('../models/Card');
const NotFoundError = require('../utils/NotFoundError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Неверный параметр запроса.');
      }
      res.send({ data: card });
    })
    .catch(next);
};


module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Неверный параметр запроса.');
      }
      res.send({ data: card });
    })
    .catch(next);
};


module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      // eslint-disable-next-line eqeqeq
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(card._id, () => {
          res.send({ message: 'Карточка удалена!' });
        });
      } else if (card === null) {
        throw new NotFoundError('Такой карточки не существует');
      } else {
        res.status(401).send({ message: 'Запрещено удалять чужие карты' });
      }
    })
    .catch(next);
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: [req.user._id] } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        Promise.reject(new NotFoundError('Карточка не найдена!'));
      }

      res.send({ data: card });
    })
    .catch(next);
};


module.exports.disLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена!');
      }

      res.send({ data: card });
    })
    .catch(next);
};
