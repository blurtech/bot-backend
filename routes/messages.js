let express = require('express');
let router = express.Router();
require('../models/answer.js');
require('../models/user.js');
const controller = require('../controllers/messages');

router.get('/greetings', controller.greetings)
router.get('/:message', controller.sendMessage)

module.exports = router;
