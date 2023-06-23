const express = require('express');
require('../routers/authrouter');
const { isLoggedIn } = require('../middleware/usermiddleware')

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
    res.send('user logged in, redirecting to profile')
});

module.exports = router;