const express = require('express');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes/routes');

const staticDir = path.join(__dirname, 'public');

app.use('/', routes);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticDir));

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log('Your port 3000');
  console.log(BASE_PATH);
});
