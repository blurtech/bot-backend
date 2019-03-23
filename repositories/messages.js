const User = require('../models/user');
const Answers = require('../models/answer');

exports.greetings = () => Answers.findOne( {'special': 'greetings'}, {'message': 1, '_id': 0} );

exports.getKeywords = () => Answers.find().distinct( 'question' );

exports.getAnswer = (keyword) => Answers.findOne( {'answers': keyword}, 'special' );