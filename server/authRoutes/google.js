const express = require('express');
const router = express.Router();
const { User } = require('../db');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { red } = require('chalk');

// redirects to the provider (Google)
router.get('/', passport.authenticate('google', { scope: 'email' }));

// User signs in with google, google then makes a request to this callback that we've configured them
router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/userhome', // CHECK THESE REDIRECTS
    failureRedirect: '/login',
  })
);

// When the provider (google) passes the user back to us via the callback, it gave us a temporary token. Now we need to give google this token and our secret. If all is good, google will send us back the user's profile (that has the info we need) and a more permanent access token for us to store in our user model
// We need to give passport our callback URL and client ID so it can perform these tasks. This is called a 'Strategy'

// only run google Oauth if you have a client ID and secret
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log(
    red('Google client ID / Secret not found. Skipping Google Oauth')
  );
} else {
  // collect our google configuration into an object
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  };

  // configure the strategy with our config object, and write the function that passport will invoke after google sends us the user's profile and access token
  const strategy = new GoogleStrategy(googleConfig, function (
    token,
    refreshToken,
    profile,
    done
  ) {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;

    User.findOrCreate({
      where: { googleId },
      defaults: { name, email },
    })
      .then(([user]) => done(null, user))
      .catch(done);
  });

  passport.use(strategy);
}

module.exports = router;
