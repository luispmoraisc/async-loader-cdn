const Dotenv = require('dotenv-webpack');

module.exports = () => {
  const objToDot = {
    path: './.env',
  };
  const dot = new Dotenv(objToDot);

  return [dot];
};
