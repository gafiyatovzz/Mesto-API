const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes/routes');

const staticDir = path.join(__dirname, 'dist');

app.use('/', routes);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticDir));

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});


module.exports = app;
