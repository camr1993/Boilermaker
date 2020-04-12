const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { db } = require('./db/index.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // link session to sequelize
const sessionStore = new SequelizeStore({ db: db }); // connect to database
const passport = require('passport'); // Supports authentication using a username and password, or signing in with 3rd party. Attaches logged-in users info to req.user
const { yellow } = require('chalk');

// passport registration
passport.serializeUser((user, done) => done(null, user.id)); // serializing a logged in user into the session data (storing an identifying piece of info as a STRING). Aka keeping track of a logged in users' ID so we can keep track of their session (logged in/logged out)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
}); // goes from string back to an object

// logging middleware
app.use(morgan('dev'));

// body parsing middleware (making req.body requests readable)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// **** The Session Store is optional. It makes it so session info is stored in the postgres database instead (on a table called Session), so we can re-deploy/re-start our server without interrupting any currently logged-in users ****
// session info will be stored in memory for the life of you server process. Gives you access to req.session. Attaches a cookie to the session so we know if user has been here
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'insecure secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
  })
);
// sessionStore.sync();

// passport consumes req.session object and attaches the user to the request object
app.use(passport.initialize());
app.use(passport.session());

// serving up all of our static files at once (bundle.js, css, images, html)
app.use(express.static(path.join(__dirname, '../public')));

// Sending all requests to /api to the /apiRoutes folder (will go to index.js because of "main" in package.json)
app.use('/api', require('./apiRoutes'));
app.use('/auth', require('./authRoutes'));

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

// listen on a port, sync up your database, and put everything on the port!
const port = process.env.PORT || 3000;

// making this a function so we can add async/await for the db connection
const run = async () => {
  // sync creates tables that do not exist. If you already have the tables it will not do anything unless you add in {force:true}
  await sessionStore.sync();
  await db.sync(); // add in {force: true} to clear tables every time
  app.listen(port, function () {
    console.log(yellow(`Server is listening on port ${port}`));
  });
};

run();
