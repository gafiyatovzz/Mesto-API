const Card = require('../models/Card');
const errorHandler = require('../utils/errorHandler');


module.exports.createCard = (req, res) => {
  console.log(req.user._id); // временное решение авторизации

  const { name, link, owner, likes, cretedAt } = req.body;

  Card.create({ name, link, owner, likes, cretedAt })
    .then(card => res.send({ data: card }))
    .catch(err => errorHandler(res, err));
}

module.exports.getCard = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => errorHandler(res, err));
}


module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then(card => res.send({ data: card }))
    .catch(err => errorHandler(res, err));
}
