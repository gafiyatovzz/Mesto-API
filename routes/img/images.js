const routeImg = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

routeImg.get('/', (req, res) => {
  fsPromises.readFile(path.join(__dirname, '../../data/img/avatar.jpg'), { encoding: null })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});

module.exports = routeImg;
