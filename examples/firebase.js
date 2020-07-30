/* eslint-disable */
import asyncLoader from 'load_async_cdn';

const firebaseConfig = {
  cdnFirebase: 'https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js',
  cdnFirestore: 'https://www.gstatic.com/firebasejs/6.2.0/firebase-firestore.js',
  apiKey: '<% appKey firebase%>',
  authDomain: '<% authDomain firebase %>',
  databaseURL: '<% databaseURL firebase %>',
  projectId: '<% projectId firebase %>',
  storageBucket: '<% storageBucket firebase%>',
  messagingSenderId: '<% messagingSenderId firebase %>',
  appId: '<% appId firebase %>',
  search: {
    collection: ' <% name of collection firebase%>',
    doc: '<% name of document firebase %>',
    property: '<% name of property into document %>',
  },
};

// you can use async/await
const loaders = new asyncLoader([], firebaseConfig);
loaders
  .load('lodash')
  .then((_) => {
    if (!_) return console.log('erro');
    console.log(_.VERSION);
  })
  .catch((err) => console.log(err));
