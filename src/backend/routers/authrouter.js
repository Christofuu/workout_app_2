/**
 * Required external modules
 */
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

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
        cb(null, currentUser);
      } else {
        new User({
          username: profile.displayName,
          googleId: profile.id,
          firstName: profile.given_name,
          lastName: profile.family_name
        }).save().then((newUser) => {
          cb(null, newUser);
        });
      }
    })
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function()  {
      return cb(null, {
        id: user.id,
        username: user.username,
      });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

const router = express.Router();

const isLoggedIn = (req, res, next) => {
  console.log(req.isAuthenticated(), req.user);
    return req.isAuthenticated() ? next() : res.sendStatus(401);    
};

router.get('/check', passport.authenticate('session'), isLoggedIn, (req, res) => {
    res.json({status: 'success'});
});

router.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenicate with Google</a>')
});

router.get('/google', passport.authenticate('google', { scope: 'profile' }), );

router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/main-menu', 
    failureRedirect: '/auth/' }),
);


module.exports = router;