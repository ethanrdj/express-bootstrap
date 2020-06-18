const express = require('express');
const {
  mainController,
  jokeController,
  randomJokeController,
  personalJokeController,
} = require('./controllers');

const app = express();

app.get('/', mainController);

app.get('/jokes', jokeController);

app.get('/joke/random', randomJokeController);

app.get('/joke/random/personal/:first/:last', personalJokeController);

module.exports = app;
