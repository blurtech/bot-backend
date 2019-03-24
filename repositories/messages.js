const User = require('../models/user');
const Answers = require('../models/answer');

exports.greetings = () => Answers.findOne( {'special': 'greetings'}, {'message': 1, '_id': 0} );

exports.getKeywords = () => Answers.find({}, 'question' );

exports.getAnswer = (keyword) => Answers.findOne( {'question': keyword}, 'question' );

exports.getMessage = (id) => Answers.findById( id, {'message': 1, '_id': 0} )