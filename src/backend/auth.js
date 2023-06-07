// /**
//  *  Required External Modules
//  */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../backend/models/User');

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
      } else {
        new User({
          username: profile.displayName,
          googleId: profile.id,
          firstName: profile.given_name,
          lastName: profile.family_name
        }).save().then((newUser) => {
          console.log('new user created: ' + newUser);
        });
      }
    })
    console.log(profile);
}));


passport.serializeUser(function(user, cb) {
    process.nextTick(function()  {
        return cb(null, { id: user.id, username: user.username, name: user.given_name
        });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

module.exports = passport;