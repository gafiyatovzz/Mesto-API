const router = require('express').Router();
const users = require('../../data/users.json');

router.get('/', (req, res) => {
  res.send(users);
});

function getUserMiddleware(req, res, next) {
  const user = users.find((u) => u._id === req.params.id);
  if (!user) {
    res.status(404);
    return next({ message: 'Нет пользователя с таким id' });
  }
  req.user = user;
  next();
}

function secondMiddleware(req, res, next) {
  req.second = true;
  next();
}

router.get('/:id', getUserMiddleware, secondMiddleware, (req, res) => {
  res.send(req.user);
});

router.put('/:id', getUserMiddleware, (req, res) => {
  req.user.name = req.body.name;
  res.send(req.user);
});

module.exports = router;
