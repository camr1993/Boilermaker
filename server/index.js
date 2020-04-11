const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

// logging middleware
app.use(morgan('dev'));

// serving up all of our static files at once (bundle.js, css, images)
app.use(express.static(path.join(__dirname, '../public')));

// body parsing middleware (making req.body requests readable)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// FILL THIS OUT!
// app.use('/api/SOMETHING', require('./folderhere'))

// Serve up index.html for any get requests that aren't for any other routes (like api)
// Goes at the end! Only thing after is the error handler to serve up 500's. 404s go before this as well FYI
app.get('*', (req, res, next) => {
  res.sendFile(__dirname, '../index.html');
});
