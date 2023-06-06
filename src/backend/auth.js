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
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ 
        googleId: profile.id 
    }, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        user = new User({
            name: profile.displayName,
            email: profile.emails[0].value
        });
        user.save(function(err) {
            if (err) console.log(err);
            return cb(err, user);
        });
      }
      else {
        return cb(err, user);
      }
    });
  }
));


passport.serializeUser(function(user, cb) {
    process.nextTick(function()  {
        return cb(null, {
            email: user.email
        });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

module.exports = passport;