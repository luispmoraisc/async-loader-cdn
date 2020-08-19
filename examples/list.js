/* eslint-disable */
import asyncLoader from 'load_async_cdn';

const files = [
  {
    global: '_',
    name: 'lodash',
    version: '',
    files: ['https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.19/lodash.min.js'],
  },
];

// you can use async/await
const loaders = new asyncLoader(files);
loaders
  .load('lodash')
  .then((_) => {
    if (!_) return console.log('erro');
    console.log(_.VERSION);
  })
  .catch((err) => console.log(err));
