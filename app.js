const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const userRoutes = require('./api/routes/user');
const cardRoutes = require('./api/routes/card');


// *************** MONGO_DB ****************** //

const URI = 'mongodb://localhost:27017/mestodb';
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(URI, options)
  .then(() => console.log('MongoDB - connected'))
  .catch((err) => console.log(err));


// *************** CONFIG ****************** //
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// *************** MIDDLEWARES ****************** //

app.use((req, res, next) => {
  req.user = {
    _id: '5ed639686e2bbd68f18e57bf',
  };

  next();
});


// *************** ROUTES ****************** //

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = app;
