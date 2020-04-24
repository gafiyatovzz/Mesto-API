const express = require('express');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes/routes');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.use(express.static(path.join(__dirname, '/public')));

app.listen(PORT, () => {
  console.log('Your port 3000');
  console.log(BASE_PATH);
});
