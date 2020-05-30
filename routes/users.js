const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const getUserMiddleware = require('./getUserMiddleware');

router.get('/', (req, res) => {
  fsPromises.readFile(path.join(__dirname, '../data/users.json'))
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

router.get('/:id', getUserMiddleware, (req, res) => {
  res.send(req.user);
});

module.exports = router;
