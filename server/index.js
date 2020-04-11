const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const { db } = require('./db/index.js');

// logging middleware
app.use(morgan('dev'));

// serving up all of our static files at once (bundle.js, css, images, html)
app.use(express.static(path.join(__dirname, '../public')));

// body parsing middleware (making req.body requests readable)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sending all requests to /api to the /apiRoutes folder (will go to index.js because of "main" in package.json)
app.use('/api', require('./apiRoutes'));

// Serve up index.html for any get requests that aren't for any other routes (like api)
// Goes at the end! Only thing after is the error handler to serve up 500's. 404s go before this as well FYI
// my guess for why this is needed even though the html file is being served up in the static middleware, is that the middleware passes it along to the next route, so the request still needs to hit a route eventually!
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware. Any route that gets an error is automatically passed here (error handling middleware is recognized b/c it has 4 parameters)
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

// listen on a port, sync up you database, and put everything on the port!
const port = process.env.PORT || 3000;

// making this a function so we can add async/await for the db connection
const run = async () => {
  await db.sync(); // add in {force: true} to clear tables every time
  app.listen(port, function () {
    console.log(`Server is listening on port ${port}`);
  });
};

run();
