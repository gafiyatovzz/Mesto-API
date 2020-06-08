const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const auth = require('./api/middlewares/auth');
const userController = require('./api/controllers/user');
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


// *************** ROUTES ****************** //

app.post('/signin', userController.login);
app.post('/signup', userController.createUser);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = app;
