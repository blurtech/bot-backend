const Message = require('../models/message');

exports.greetings = () => Message.find('greetings','answer');