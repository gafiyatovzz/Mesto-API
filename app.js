const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const userController = require('./controllers/user');
const userRoutes = require('./routes/user');
const cardRoutes = require('./routes/card');


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
app.use(requestLogger);

// *************** CRASH-TEST ****************** //
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// *************** ROUTES ****************** //

app.post('/signin', userController.login);
app.post('/signup', userController.createUser);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res) => {
  if (!err.statusCode) {
    const { statusCode = 500, message } = err;

    res
      .status(statusCode)
      .send({
        // проверяем статус и выставляем сообщение в зависимости от него
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
  }
  res.status(err.statusCode).send({ message: err.message });
});


app.listen(PORT, () => {
  console.log('Server launch on port', PORT);
});
