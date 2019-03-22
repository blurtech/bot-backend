let express = require('express');
let router = express.Router();
let message = require('../models/message');

/* Send greetings */
router.get('/greetings', function(req, res, next) {
    res.json({message: 'Hello!'});
});


router.post('/', function(req, res, next) {
    res.json({message: req.body.message + ' no, fuck you'});
});

module.exports = router;
