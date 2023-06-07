const express = require('express');
const passport = require('passport');
require('../auth.js');

const router = express.Router();

router.use(require('express-session')({
  secret: 'unga bunga',
  resave: true,
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
  passport.authenticate('google', { failureRedirect: '/google' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("User: ", req.user);
    res.redirect('/protected');
  }
);

router.get('/protected', isLoggedIn, (req, res) => {
    res.send('Hello!');
});

module.exports = router;
