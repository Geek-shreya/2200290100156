const express = require('express');
const numbersController = require('./controllers/numbersController');

const app = express();

app.use(express.json());

app.get('/numbers/:numberid', numbersController.getNumbers);

module.exports = app;