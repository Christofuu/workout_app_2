require('dotenv').config();
const express = require('express');
const passport = require('passport');
const SECRET = process.env.REACT_APP_SESSION_SECRET;
require('../auth.js');

const router = express.Router();

router.use(require('express-session')({
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
}));
router.use(passport.initialize());
router.use(passport.session());

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

router.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenicate with Google</a>')
});

router.get('/google', passport.authenticate('google', { scope: 'profile' }), );

router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: '/auth/protected', 
    failureRedirect: '/auth/google/failure' }),
);

router.get('/protected', isLoggedIn, (req, res) => {
    console.log("authentication successful");
    res.send(`Hello ${req.user.username}`);
});

router.get('/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
  console.log('Failed to authenticate..');
})

module.exports = router;
