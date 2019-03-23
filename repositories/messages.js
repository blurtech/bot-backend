const User = require('../models/user');
const Answers = require('../models/answer');

exports.greetings = () => Answers.findOne( {'special': 'greetings'}, {'message': 1, '_id': 0} );

exports.getKeywords = () => Answers.distinct('question');

exports.getAnswer = (keyword) => Answers.find( {'answers': keyword} );