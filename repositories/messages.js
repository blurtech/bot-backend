const Message = require('../models/message');
const Answers = require('../models/answer');

exports.greetings = () => Answers.find({'special': 'greetings'},'answer');