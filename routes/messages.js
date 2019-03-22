let express = require('express');
let router = express.Router();
require('../models/answer.js');
require('../models/message.js');
const controller = require('../controllers/messages');

router.get('/greetings', controller.greetings)
router.post('/', controller.sendMessage)

module.exports = router;
