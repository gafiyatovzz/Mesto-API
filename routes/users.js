const router = require('express').Router();

const path = require('path');
const fsPromises = require('fs').promises;
const users = require('../data/users.json');

router.get('/', (req, res) => {
  fsPromises.readFile(path.join(__dirname, '../data/users.json'), { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      console.log(`Внимание ошибка >>> ${err} <<<`);
    });
});

function getUserMiddleware(req, res, next) {
  const user = users.find((u) => u._id === req.params.id);
  if (!user) {
    res.status(404);
    return next({ message: 'Нет пользователя с таким id' });
  }
  req.user = user;
  return next();
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
