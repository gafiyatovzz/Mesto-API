const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const staticDir = path.join(__dirname, 'dist');
const routes = require('./routes/routes');


// *************** MONGO_DB ****************** //

const URI = 'mongodb://localhost:27017/mestodb';
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}

mongoose.connect(URI, options);



// *************** ROUTES ****************** //


app.use('/', routes);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticDir));

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});


module.exports = app;
