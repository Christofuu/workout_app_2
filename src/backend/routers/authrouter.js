/**
 * Required external modules
 */
require('dotenv').config();
require('../auth.js');
const express = require('express');
const passport = require('passport');

/**
 * App variables
 */

const router = express.Router();

// session configuration
router.use(passport.initialize());
router.use(passport.session());

const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
};

router.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenicate with Google</a>')
});

router.get('/google', passport.authenticate('google', { scope: 'profile' }), );

router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: '/profile', 
    failureRedirect: '/auth/google/failure' }),
);

router.get('/protected', isLoggedIn, (req, res) => {
    console.log("authentication successful");
    res.send(`Hello ${req.user}`);
});

router.get('/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
  console.log('Failed to authenticate..');
})

module.exports = router;
