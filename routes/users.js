const router = require('express').Router();

const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

router.get('/', (req, res) => {
  fsPromises.readFile(path.join(__dirname, '../data/users.json'))
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send(`Error: ${err}`);
    });
});

function getUserMiddleware(req, res, next) {
  fs.readFile(path.join(__dirname, '../data/users.json'), (e, data) => {
    // eslint-disable-next-line no-underscore-dangle
    const user = JSON.parse(data).find((u) => u._id === req.params.id);

    if (!user) {
      res.status(404);
      return next({ message: 'Нет пользователя с таким id' });
    }
    req.user = user;
    return next();
  });
}

router.get('/:id', getUserMiddleware, (req, res) => {
  res.send(req.user);
});

module.exports = router;
