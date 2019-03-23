const User = require('../models/user');
const Answers = require('../models/answer');

exports.greetings = () => Answers.findOne( {'special': 'greetings'}, {'message': 1, '_id': 0} );

exports.getKeywords = () => Answers.find().distinct( 'question' );

exports.getAnswer = (keyword) => Answers.findOne( {'question': keyword}, 'question' );

exports.getMessage = (id) => Answers.findOne({'_id': id}, {'message': 1, '_id': 0})