const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const staticDir = path.join(__dirname, 'client/dist');

const userRoutes = require('./api/routes/user');
const cardRoutes = require('./api/routes/card');



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
app.use(bodyParser.json())
app.use(express.static(staticDir));



// *************** MIDDLEWARES ****************** //

app.use((req, res, next) => {
  req.user = {
      _id: '5ed639e96e2bbd68f18e57c0'
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
