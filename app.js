const express = require('express');

const app = express();
const { PORT = 3000, BASE_PATH } = process.env;
const bodyParser = require('body-parser');
const path = require('path');

const router = require('./routes/routes');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.use(express.static(path.join(__dirname, '/public'), { encoding: 'utf8' }));

app.listen(PORT, () => {
  console.log('Your port 3000');
  console.log(BASE_PATH);
});
