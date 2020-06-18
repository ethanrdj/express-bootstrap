// Controller functions

const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my jokes API!',
  });
};

const jokeController = (req, res) => {
  res.send({
    message: 'This is the all jokes endpoint',
  });
};

const randomJokeController = (req, res) => {
  res.send({
    message: 'This is the random joke endpoint',
  });
};

const personalJokeController = (req, res) => {
  res.send({
    message: 'This is the personalised joke endpoint',
  });
};

module.exports = {
  mainController,
  jokeController,
  randomJokeController,
  personalJokeController,
};
