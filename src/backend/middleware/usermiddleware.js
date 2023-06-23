const User = require('../models/User')

const isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated(), req.user);
      return req.isAuthenticated() ? next() : res.sendStatus(401);    
};

const getUser = (req, res, next) => {
    User.findOne({ username: req.user.username }).then((currentUser) => {
        if (currentUser) {
          res.locals.user = currentUser
        } else {
          return res.sendStatus(404)
        }
        next();
    })
}

module.exports = { isLoggedIn, getUser };