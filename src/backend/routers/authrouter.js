/**
 * Required external modules
 */
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const MagicLoginStrategy = require('passport-magic-login').default;
const User = require('../models/User');

/**
 * App Variables
 */

const PORT = process.env.REACT_APP_PORT || "8000";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
const FACEBOOK_CLIENT_SECRET = process.env.REACT_APP_FACEBOOK_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
const MAGIC_LOGIN_SECRET = process.env.REACT_APP_MAGIC_LOGIN_SECRET;

/**
 * Authentication strategy configurations
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

const magicLogin = new MagicLoginStrategy({
  secret: MAGIC_LOGIN_SECRET,
  callbackUrl: `http://localhost:${PORT}/auth/magiclogin/callback`,

  sendMagicLink: async(destination, href) => {
    await sendEmail({
      to: destination,
      body: `Click this link to finish logging in to LiftBuddy: http://localhost:${PORT}${href}`
    })
  },

  verify: (payload, cb) => {
    // Get or create a user with the provided email from the database
    User.findOne({email: payload}).then((currentUser) => {
      if (currentUser) {
        return (null, currentUser)
      }
      else {
        new User({
          email: payload
        }).save().then((newUser) => {
          cb(null, newUser)
        })
      }
    })
  },

  jwtOptions: {
    expiresIn: "2 days",
  }
})

passport.use(magicLogin)


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

/**
 * Middleware for authenticating users before redirecting them to authenticated routes
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
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


/**
 * Google authentication routes
 */
router.get('/google', passport.authenticate('google', { scope: 'profile' }), );

router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: '/main-menu', 
    failureRedirect: '/auth/' }),
);

/**
 * Facebook authentication routes
 */

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/main-menu',
    failureRedirect: '/auth/'
  })
)

/**
 * Email authentication routes
 */
router.post('/magiclogin', magicLogin.send);
router.get('/magiclogin', passport.authenticate('magiclogin'))


module.exports = router;