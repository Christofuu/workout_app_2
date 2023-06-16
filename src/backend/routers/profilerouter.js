const express = require('express');
require('../routers/authrouter');

const router = express.Router();

const isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated(), req.user);
      return req.isAuthenticated() ? next() : res.sendStatus(401);    
  };

router.get('/', isLoggedIn, (req, res) => {
    res.send('user logged in, redirecting to profile')
});

module.exports = router;