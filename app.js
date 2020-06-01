const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const staticDir = path.join(__dirname, 'dist');

const users = require('./routes/user');
const cards = require('./routes/card');



// *************** MONGO_DB ****************** //

const URI = 'mongodb://localhost:27017/mestodb';
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

mongoose.connect(URI, options)
  .then(() => console.log('MongoDB - connected'))
  .catch(err => console.log(err));



// *************** CONFIG ****************** //

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticDir));



// *************** ROUTES ****************** //

app.use('/users', users);
app.use('/cards', cards);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = app;
