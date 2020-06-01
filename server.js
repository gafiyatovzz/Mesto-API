const express = require('express');
const { PORT = 3000 } = process.env;
const app = require('./app')

app.listen(PORT, () => {
  console.log('Server launch on port', PORT);
});