// /**
//  *  Required External Modules
//  */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../backend/models/User');
require('dotenv').config();

/**
 * App Variables
 */

const PORT = process.env.REACT_APP_PORT || "8000";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${PORT}/auth/google/callback`,
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, cb) {
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if (currentUser) {

        console.log('user is: ' + currentUser);
        cb(null, currentUser);
      } else {
        new User({
          username: profile.displayName,
          googleId: profile.id,
          firstName: profile.given_name,
          lastName: profile.family_name
        }).save().then((newUser) => {
          console.log('new user created: ' + newUser);
          cb(null, newUser);
        });
      }
    })
}));


passport.serializeUser(function(user, cb) {
    process.nextTick(function()  {
        return cb(null, user.id);
    });
});

passport.deserializeUser(function(id, cb) {
    process.nextTick(function() {
      User.findById(id).then((user) =>
      cb(null, user))
    });
});

module.exports = passport;