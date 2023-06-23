const express = require('express');
require('../routers/authrouter');
const { isLoggedIn, getUser } = require('../middleware/usermiddleware')
const router = express.Router();

router.get('/', isLoggedIn, getUser, (req, res) => {
    const { user } = res.locals
    res.json({user})
});

module.exports = router;