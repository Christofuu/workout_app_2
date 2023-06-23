/**
 * Required external modules
 */
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
const { isLoggedIn } = require('../middleware/usermiddleware');

/**
 * App Variables
 */

const PORT = process.env.REACT_APP_PORT || "8000";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
const FACEBOOK_CLIENT_SECRET = process.env.REACT_APP_FACEBOOK_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

/**
 * Authentication strategies
 */

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
          email: profile.emails[0].value,
          firstName: profile.given_name,
          lastName: profile.family_name
        }).save().then((newUser) => {
          cb(null, newUser);
        });
      }
    })
}));

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_SECRET,
  clientSecret: FACEBOOK_APP_ID,
  callbackURL: `http://localhost:${PORT}/auth/facebook/callback`,
  state: true
},
  function(req, accessToken, refreshToken, profile, cb) {
    cb(null, profile)
}));

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: `http://localhost:${PORT}/auth/github/callback`
},
  function(req, accessToken, refreshToken, profile, cb) {
    User.findOne({$or: [ {githubId: profile.id}, {email: profile.emails[0].value} ]}).then((currentUser) => {
      if (currentUser) {
        cb(null, currentUser);
      } else {
        new User({
          githubId: profile.id,
          email: profile.emails[0].value
        }).save().then((newUser) => {
          cb(null, newUser)
        })
      }
    })
  }
))



passport.serializeUser(function(user, cb) {
  process.nextTick(function()  {
      return cb(null, {
        id: user.id,
        username: user.username,
        email: user.email
      });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

const router = express.Router();

router.get('/check', passport.authenticate('session'), isLoggedIn, (req, res) => {
    res.json({status: 'success'});
});

router.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenicate with Google</a>')
});


/**
 * Google authentication routes
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }), );

router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/main-menu', 
    failureRedirect: '/' }),
);

/**
 * Facebook authentication routes
 */

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/main-menu',
    failureRedirect: '/'
  })
)

/**
 * Github authentication routes
 */

router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ]}))

router.get('/github/callback',
  passport.authenticate('github', {
    successRedirect: 'http://localhost:3000/main-menu',
    failureRedirect: '/'
}))


module.exports = router;