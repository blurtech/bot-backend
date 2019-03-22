const Message = require('../models/message');
const Answers = require('../models/answer');

exports.greetings = () => Answers.findOne({'special': 'greetings'},{'message': 1, '_id': 0},function(err, data) { console.log(err, data, data.length); });