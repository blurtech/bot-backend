let express = require('express');
let router = express.Router();
let messages = require('../models/messages');

/* Send greetings */
router.get('/greetings', function(req, res, next) {
    res.json({message: 'Hello!'});
});

module.exports = router;
