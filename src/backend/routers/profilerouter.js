const express = require('express');
require('../auth');
require('../routers/authrouter');
const passport = require('passport');

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

const isLoggedIn = (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
        res.redirect('/auth/');
    } else {
        // if logged in
        next();
    }
};

router.get('/', isLoggedIn, (req, res) => {
    res.send(`you are logged in ${req.user.username}`);
});

module.exports = router;